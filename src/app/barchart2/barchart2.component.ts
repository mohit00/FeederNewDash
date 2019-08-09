 import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation ,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-barchart2',
  templateUrl: './barchart2.component.html',
  styleUrls: ['./barchart2.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class Barchart2Component  implements OnChanges {
  tF:any;
  pC:any  = {};
  leg:any ={};
   hG:any ={};
  arc:any;
  y:any;
  x:any;
  barColor:any;
  _current:any;
  @ViewChild('chart',{static:true})
  private chartContainer: ElementRef;
   
  @Input() private data: Array<any>;
  margin = {top: 20, right: 20, bottom: 30, left: 40};
  constructor() { }
  ngOnChanges(): void {
     if (!this.data) { return; }
     this.dashboard(this.data);
  }
  histoGram(fD){
    this.hG={} ;
    var    hGDim = {t: 60, r: 0, b: 30, l: 0,w:0,h:0};
    hGDim.w = 500 - hGDim.l - hGDim.r, 
    hGDim.h = 300 - hGDim.t - hGDim.b;
        
    //create svg for histogram.
    var hGsvg = d3.select("#chartJs2").append("svg")
        .attr("width", hGDim.w + hGDim.l + hGDim.r)
        .attr("height", hGDim.h + hGDim.t + hGDim.b).append("g")
        .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");
  
    // create  for x-axis mapping.
    this.x = d3.scaleBand().rangeRound([0, hGDim.w])
    .padding(0.1)
            .domain(fD.map((d)=> { return d[0]; }));
  
    // Add x-axis to the histogram svg.
    hGsvg.append("g").attr("class", "x axis")
        .attr("transform", "translate(0," + hGDim.h + ")")
        .call(d3.axisBottom(this.x));
  
    // Create  for y-axis map.
    this.y= d3.scaleBand().rangeRound([hGDim.h, 0])
            .domain(fD.map((d)=> { return d[0]; }));
  
            
    // Create bars for histogram to contain rectangles and freq labels.
    var bars = hGsvg.selectAll(".bar").data(fD).enter()
            .append("g").attr("class", "bar");
    
    //create the rectangles.
    bars.append("rect")
        .attr("x", (d) =>{ return this.x(d[0]); })
        .attr("y", (d) =>{
          console.log(d)
             return this.y(d[1]);
           })
        .attr("width", this.x.bandwidth())
        .attr("height", (d)=> {
          console.log(hGDim.h)
          console.log(this.y(d[1]))
          console.log(hGDim.h - this.y(d[1]))

           return hGDim.h - this.y(d[1]);
           })
        .attr('fill',this.barColor)
        .on("mouseover",(d)=>{
            // utility  to be called on mouseover.
        // filter for selected state.
        var st = this.data.filter((s)=>{ return s.State == d[0];})[0],
        nD = d3.keys(st.freq).map((s)=>{ return {type:s, freq:st.freq[s]};});
       
    // call update s of pie-chart and legend.    
    this.pC.update(nD);
    this.leg.update(nD);
        })// mouseover is defined below.
        .on("mouseout",(d)=>{
             // utility  to be called on mouseout.
        // reset the pie-chart and legend.    
        this.pC.update(this.tF);
        this.leg.update(this.tF);
        });// mouseout is defined below.
        
    //Create the frequency labels above the rectangles.
    bars.append("text").text((d)=>{ return d3.format(",")(d[1])})
        .attr("x", (d) =>{ return this.x(d[0])+this.x.bandwidth()/2; })
        .attr("y", (d)=> { return this.y(d[1])-5; })
        .attr("text-anchor", "middle");
    
    
    // create  to update the bars. This will be used by pie-chart.
    this.hG.update = (nD, color)=>{
        // update the domain of the y-axis map to reflect change in frequencies.
        this.y.domain([d3.max(nD, (d) =>{ return d[1]; })]);
        
        // Attach the new data to the bars.
        var bars = hGsvg.selectAll(".bar").data(nD);
        
        // transition the height and color of rectangles.
        bars.select("rect").transition().duration(500)
            .attr("y", (d)=> {return this.y(d[1]); })
            .attr("height", (d)=> { return hGDim.h - this.y(d[1]); })
            .attr("fill", color);
  
        // transition the frequency labels location and change value.
        bars.select("text").transition().duration(500)
            .text((d)=>{ return d3.format(",")(d[1])})
            .attr("y", (d)=> {return this.y(d[1])-5; });            
    }        
    return this.hG;
  }
   pieChart(pD){
    this.pC ={};var     pieDim ={w:250, h: 250,r:0};
    pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;
            
    // create svg for pie chart.
    var piesvg = d3.select("#chartJs2").append("svg")
        .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
        .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");
    
    // create  to draw the arcs of the pie slices.
    this.arc = d3.arc().outerRadius(pieDim.r - 10).innerRadius(0);
  
    // create a  to compute the pie slice angles.
    var pie = d3.pie().sort(null).value((d:any)=> { return d.freq; });
  
    // Draw the pie slices.
    piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", this.arc)
        .each((d) =>{ this._current = d; })
        .style("fill", (d : {data})=> {
           return this.segColor(d.data.type); })
        .on("mouseover",(d:any)=>{

        // call the update  of histogram with new data.
        this.hG.update(this.data.map((v)=>{ 
          return [v.State,v.freq[d.data.type]];}),this.segColor(d.data.type));
        }).on("mouseout",()=>{
          this.hG.update(this.data.map((v)=>{
            return [v.State,v.total];}), this.barColor);
        });
  
    // create  to update pie-chart. This will be used by histogram.
    this.pC.update = (nD)=>{
        piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
            .attrTween("d", this.arcTween);
    }        
    // Utility  to be called on mouseover a pie slice.
     
    //Utility  to be called on mouseout a pie slice.
     
    // Animating the pie-slice requiring a custom  which specifies
    // how the intermediate paths should be drawn.
     
    return this.pC;
  
  }
   arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return (t)=> { return this.arc(i(t));    };
} 
 segColor(c){
    return {low:"#807dba", mid:"#e08214",high:"#41ab5d"}[c]; 
  }
 legend(lD){
  this.leg = {};
      
  // create table for legend.
  var legend = d3.select("#chartJs2").append("table").attr('class','legend');
  
  // create one row per segment.
  var tr = legend.append("tbody").selectAll("tr").data(lD).enter().append("tr");
      
  // create the first column for each segment.
  tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
      .attr("width", '16').attr("height", '16')
.attr("fill",(d : any)=>{ return this.segColor(d.type); });
      
  // create the second column for each segment.
  tr.append("td").text((d : any)=>{ return d.type;});

  // create the third column for each segment.
  tr.append("td").attr("class",'legendFreq')
      .text((d : any)=>{ return d3.format(",")(d.freq);});

  // create the fourth column for each segment.
  tr.append("td").attr("class",'legendPerc')
      .text((d)=> { return this.getLegend(d,lD);});

  // Utility  to be used to update the legend.
  this.leg.update = (nD)=>{
      // update the data attached to the row elements.
      var l = legend.select("tbody").selectAll("tr").data(nD);

      // update the frequencies.
      l.select(".legendFreq").text((d : any)=>{ return d3.format(",")(d.freq);});

      // update the percentage column.
      l.select(".legendPerc").text((d)=>{ return this.getLegend(d,nD);});        
  }
 

  return this.leg;
}
 
getLegend(d,aD){ // Utility  to compute percentage.
  return d3.format("%")(d.freq/d3.sum(aD.map((v)=>{ return v.freq; })));
}

  dashboard(dataNew){
    this.barColor = 'steelblue';
    
dataNew.forEach((d)=>{d.total=d.freq.low+d.freq.mid+d.freq.high;});

 
//  to handle pieChart.


//  to handle legend.


// calculate total frequency by segment for all state.
this.tF = ['low','mid','high'].map((d)=>{ 
    return {type:d, freq: d3.sum(this.data.map((t)=>{ 
     return t.freq[d];
  }))}; 
});    

// calculate total frequency by state for all segment.
var sF = this.data.map((d)=>{return [d.State,d.total];});

this.hG= this.histoGram(sF); // create the histogram.
this.pC = this.pieChart(this.tF); // create the pie-chart.
this.leg = this.legend(this.tF);  // create the legend.

  }
  private createChart(): void {
    d3.select('svg').remove();
    const element = this.chartContainer.nativeElement;
    const data = this.data;
    const svg = d3.select(element).append('svg')
        .attr('width', element.offsetWidth)
        .attr('height', element.offsetHeight);

    const contentWidth = element.offsetWidth - this.margin.left - this.margin.right;
    const contentHeight = element.offsetHeight - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map(d => d.letter));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([0, d3.max(data, d => d.frequency)]);

    const g = svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.letter))
        .attr('y', d => y(d.frequency))
        .attr('width', x.bandwidth())
        .attr('height', d => contentHeight - y(d.frequency));
  }
}
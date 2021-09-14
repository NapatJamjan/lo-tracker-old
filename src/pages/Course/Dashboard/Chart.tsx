import { Tooltip } from "react-bootstrap";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from "recharts";

export default function Chart(props:any){
    return(
      <div style={{position:"absolute",right:"1%",width:"40%",height:"50%",marginTop:"0.5%"}}>
        <select name="Total PLO%" style={{float:"right"}}>
            <option value="Total PLO%">Total PLO%</option>
            <option value="Total LO%">Total LO%</option>
        </select><br/>
        <ChartBar/>
      </div>
    );
  }

function ChartBar(props:any){
    const data = [{name: 'PLO1', score: 75},{name: 'PLO2', score: 100},{name: 'PLO3', score: 30},
    {name: 'PLO4', score: 60},];
    return(
        <ResponsiveContainer>
          <BarChart data={data} width={600} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis/>
            <Tooltip/>
            {/* <Legend/> */}
            <Bar dataKey="score" fill="green"/>
          </BarChart>
        </ResponsiveContainer>
    )
}

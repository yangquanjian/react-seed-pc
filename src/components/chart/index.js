/**
 * @file components/chart/index.js
 * @author maoquan(maoquan@htsc.com)
 */
/* Line*/
import LinePileup from './Line/LinePileup';
import MultipleXLine from './Line/MultipleXLine';
import StepLine from './Line/StepLine';
/* Bar*/
import BarWorldPeople from './Bar/BarWorldPeople';
import BarFlash from './Bar/BarFlash';
/* Pie*/
import Pie from './Pie/Pie';
import NestPie from './Pie/NestPie';
import Chart from './Chart';
import Series from './Series';


/* Line*/
Chart.LinePileup = LinePileup;
Chart.MultipleXLine = MultipleXLine;
Chart.StepLine = StepLine;
/* Bar*/
Chart.BarWorldPeople = BarWorldPeople;
Chart.BarFlash = BarFlash;
/* Pie*/
Chart.Pie = Pie;
Chart.NestPie = NestPie;

Chart.Series = Series;
export default Chart;

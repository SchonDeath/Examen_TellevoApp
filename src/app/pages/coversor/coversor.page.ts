import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { CoversorService } from 'src/app/services/coversor/coversor.service';

@Component({
  selector: 'app-coversor',
  templateUrl: './coversor.page.html',
  styleUrls: ['./coversor.page.scss'],
})
export class CoversorPage implements OnInit {
  pageTitle = 'Conversor de Moneda';
  isNotHome= true;
  
getdata:any[]=[];
indicadores: any;
UF: any;
Dolar: any;
Euro: any ;
CLP: number = 0;
llegaRES: boolean=false;
conversion: any;

@ViewChild(IonInfiniteScroll) infinite: IonInfiniteScroll;

constructor(public CoversorService: CoversorService, private navController: NavController) {}


ngOnInit(): void {
  this.cargaDivisa();
}

async cargaDivisa(listaDivisa:boolean = false, event?){

  await this.CoversorService.getIndicadores()
  .then(respuesta => {
    this.indicadores = respuesta;
    this.UF = respuesta.uf;
    this.Dolar = respuesta.dolar;
    this.Euro = respuesta.euro;
    this.llegaRES = true;
  },
  (err) => {
    console.log(err);
  });
}

ConvertirDolar() {
   var numDolar = this.CLP / parseFloat(this.Dolar.valor)
  this.conversion = numDolar.toFixed(2)
}
ConvertirEuro() {
  var numEuro = this.CLP / parseInt(this.Euro.valor)
  this.conversion =  numEuro.toFixed(2)
 
}
limpiarCampo(){
  this.conversion = 0;
  this.CLP = 0;
}

}

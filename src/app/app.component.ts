import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadosService } from './services/estados/estados.service';
import { PaisesService } from './services/paises/paises.service';
import { PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  personaForm: FormGroup;
  paises: any;
  estados: any;
  persona: any;


  constructor(
    public fb: FormBuilder,
    public estadosService: EstadosService,
    public paisesService: PaisesService,
    public personaService: PersonaService
  ) {
    this.personaForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      pais: ['', Validators.required],
      estado: ['', Validators.required]
    }); 
  }
  ngOnInit(): void {

    this.paisesService.getAllPaises().subscribe(resp => {
      this.paises = resp
    },
      error => { console.error(error) }
    );

    this.personaForm.get('pais')?.valueChanges.subscribe(value=> {
      this.estadosService.getAllEstadosByPais(value.id).subscribe(resp=>{
        this.estados = resp;
      },
      error=>{console.error(error)}
      )
    });

    this.personaService.getAllPersonas().subscribe(resp=>{
      this.persona = resp;
    },
    error=>{console.error(error)}
    )
  }

  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp=>{
      console.log(this.personaForm.value)
      this.personaForm.reset();
      this.persona.push(resp);
    },
     error=>{console.error(error)
     console.log(this.personaForm.value)
     }
    )

  }


  cargarEstadosPorPaisesId(event: any) {
    const paisId: number = parseInt(event.target.value, 10);
    this.estadosService.getAllEstadosByPais(paisId).subscribe(
      resp => {
        this.estados = resp;
      },
      error => {
        console.error(error);
      }
    );
  }
  

}
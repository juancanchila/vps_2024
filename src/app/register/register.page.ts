import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { RegisterI } from 'modelos/register.interface';
import { ResponseI } from 'modelos/response.interface';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  regisForm: FormGroup;
  toke:ResponseI;
  tokSesion : any;
  urlBase: any;
  message_TC : any;
  constructor(private auth: AuthService, public fb: FormBuilder,public alertController:AlertController) {
    this.urlBase=environment.urlBase;
    this.regisForm= this.fb.group({


      mail:["", Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])],
      field_nombres_registro:["",Validators.required],
	field_apellidos_registro:["",Validators.required],
        field_celular_registro:["",Validators.required],

        field_ciudad_registro:["",Validators.required],
        field_pais_registro:["",Validators.required],
        field_sector_registro:["",Validators.required],
      field_direccion_registro:["",Validators.required],
        field_acepta_terminos_registro:["",Validators.required],
      field_id_registro:["",Validators.required]
     });

   }

  ngOnInit() {
    /*
    message: `1.	Introducción
    VaPaEsa COL SAS es una empresa barranquillera que cuenta con una plataforma virtual diseñada para conectar clientes con proveedores poniendo a su servicio herramientas tecnológicas como una aplicación móvil y una página web, que les permitirá a los usuarios ingresar y conocer sobre los productos y/o servicios exhibidos en línea y gestionar procesos de compra o cualquier otra actividad que el cliente requiera directamente por medio del personal repartidor.
    VaPaEsa COL SAS con el propósito de dar cumplimiento a lo dispuesto por la normatividad vigente de protección de datos personales, de acuerdo a lo establecido por la ley 1581 de 2012, decreto 1074 de 2015 y demás disposiciones que las modifiquen, establece la siguiente POLITICA DE PROTECCION Y TRATAMIENTO DE DATOS PERSONALES en adelante ( Política de Tratamiento) con el objetivo de salvaguardar la información personal suministrada por los usuarios que tengan relación con VaPaEsa COL SAS como lo son los empleados, colaboradores, socios, clientes, proveedores o cualquier otra persona natural de la cual VaPaEsa COL SAS obtenga, recopile y procese datos personales directamente o a través de terceros en su nombre.

    La Política de Tratamiento de Datos tiene como finalidad proteger el derecho constitucional de Habeas Data que tienen todas las personas para conocer, modificar o actualizar la información que se halla recopilado y almacenado a través de las distintas bases de datos de VaPaEsa COL SAS y en virtud del cumplimiento de dicho derecho solo recopilará y dará tratamiento a datos personales cuando haya sido autorizado previamente por el titular. Dicha política expone los lineamientos corporativos (medios y canales de tratamiento, procedimientos y áreas responsables de PQRS), implementados a fin de proteger los Datos Personales de los titulares.

    <br>
    2.	Definiciones
    Datos Personales: se le denomina a cualquier información relacionada a personas naturales determinadas o determinables que pueden ayudar a su identificación.
    Autorización: consentimiento previo, expreso e informado que otorga el titular para llevar a cabo el tratamiento de datos personales.
    Titular: es la persona natural o jurídica de quien se refiere una información que reposa en un banco de datos.
    Responsable de Tratamiento: Persona natural o jurídica de carácter público o privado que por sí misma o en sociedad realiza el tratamiento de datos personales por cuenta del responsable.
    Tratamiento: Actividad o conjunto de actividades que se realizan sobre los datos personales tales como: recolección, almacenamiento, uso, manipulación, etc.
    Base de Datos: es un programa capaz de almacenar una gran cantidad de datos relacionados, que pueden ser consultados rápidamente de acuerdo con características de selección.
    Violación de Datos Personales: Es el delito tipificado en el artículo 269 del código penal, en el cual se establece: ( El que sin estar facultado para ello con provecho propio o de un tercero obtenga, copile, sustraiga, ofrezca, intercambie, venda, compre, envíe, intercepte, distribuya o modifique datos personales contenidos en ficheros, archivos o bases de datos o a través de medios semejantes incurrirá en pena de prisión de cuarenta y ocho (48) a noventa y seis (96) meses en multa de 100 a 1000 salarios mínimos legales mensuales vigentes.
    <br>
    3.	Tratamiento de Datos Personales
    Para efectos del registro y la operación del servicio VaPaEsa solicitará y recopilará algunos datos personales de los usuarios dándole tratamiento a través de la política de tratamiento de datos personales provista por VaPaEsa.
    Con la aceptación de los presentes Términos y Condiciones el usuario declara su aceptación previa y expresa para el tratamiento de sus datos personales.
    <br>
    4.	Principios de Ley para el Tratamiento de Datos Personales
    Según lo establecido en el Título II de la Ley Estatutaria 1581 de 2012, la protección de datos personales se regirá por la aplicación armónica e integral de los siguientes principios:
    Principio de Legalidad en el Tratamiento de Datos Personales: Consiste en el tratamiento de datos personales a que se refiere la Ley Estatutaria 1581 de 2012 es una actividad reglada que debe sujetarse a lo establecido en ella y en las demás disposiciones que la desarrollen.
    Principio de Finalidad: Consiste en el tratamiento de los datos personales debe obedecer a una finalidad legítima de acuerdo con la Constitución y la ley, la cual debe ser informada al Titular.
    Principio de Libertad: Establece que el tratamiento de los datos personales sólo puede ejercerse con el consentimiento, previo, expreso e informado del Titular. Los datos personales no podrán ser obtenidos o divulgados sin previa autorización, o en ausencia de mandato legal o judicial que releve el consentimiento.
    Principio de Veracidad o Calidad: Hace referencia a la información sujeta a tratamiento. Está debe ser veraz, completa, exacta, actualizada, comprobable y comprensible. Se prohíbe el Tratamiento de datos parciales, incompletos, fraccionados o que induzcan a error.
    Principio de Transparencia: Consiste en el Tratamiento de los datos personales garantizando el derecho del Titular a obtener del responsable del tratamiento o del Encargado del tratamiento, en cualquier momento y sin restricciones, información acerca de la existencia de datos que le conciernan.
    Principio de Seguridad: La información sujeta a tratamiento por el responsable del Tratamiento o Encargado del tratamiento a que se refiere la Ley Estatutaria 1581 de 2012, se deberá manejar con las medidas técnicas, humanas y administrativas que sean necesarias para otorgar seguridad a los registros evitando su adulteración, pérdida, consulta, uso o acceso no autorizado o fraudulento.
    Principio de Confidencialidad: Todas las personas que intervengan en el tratamiento de datos personales que no tengan la naturaleza de públicos están obligadas a garantizar la reserva de la información, inclusive después de finalizada su relación con alguna de las labores que comprende el tratamiento, pudiendo sólo realizar suministro o comunicación de datos personales cuando ello corresponda al desarrollo de las actividades autorizadas en la Ley Estatutaria 1581 de 2012 y en los términos de la misma.
    Principio de Acceso y Circulación Restringida: El tratamiento se sujeta a los límites que se derivan de la naturaleza de los datos personales, de las disposiciones de la Ley Estatutaria 1581 de 2012 y la Constitución. En este sentido, el tratamiento sólo podrá hacerse por personas autorizadas por el Titular y/o por las personas previstas en la mencionada ley.
    <br>
    5.	Derechos del Titular
    En cumplimiento de las garantías fundamentales consagradas en la Constitución y la ley, y sin perjuicio de lo dispuesto en las demás normas que regulen la materia, los Titulares de los datos personales que VaPaEsa recolecte podrán ejercer de forma gratuita e ilimitadamente los siguientes derechos:
    •	Derecho al acceso a su información personal objeto de tratamiento.
    •	Derecho a la actualización de los datos personales objeto de tratamiento.
    •	Derecho a la rectificación de los datos personales objeto de tratamiento.
    •	Derecho de oposición a que los datos personales sean objeto de tratamiento
    •	Derecho a solicitar la supresión de los datos personales cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales.
    •	Derecho a solicitar prueba de la autorización otorgada para el tratamiento.
    •	Derecho a revocar el consentimiento para el tratamiento de los datos personales.
    •	Derecho a presentar quejas y reclamos ante la Superintendencia de Industria y Comercio por infracciones a lo dispuesto en la Ley Estatutaria 1581 de 2012 y las demás normas que la modifiquen, adicionen o complementen.
    •	Derecho a ser informado por parte del responsable y/o encargado del uso y tratamiento que se les dará a los datos personales, así como de las modificaciones y actualizaciones de las políticas de protección, medidas de seguridad y finalidades.
    <br>
    6.	Finalidad Tratamiento de Datos Personales
    Los Datos Personales recolectados por VaPaEsa COL SAS son incluidos en una Base de Datos a la cual tiene acceso el personal autorizado de VaPaEsa en ejercicio de sus funciones, advirtiendo que en ningún caso está autorizado el Tratamiento de la información para fines diferentes a los aquí descritos, y que le sean comunicados al Titular directamente a más tardar al momento de la recolección.
    Usuarios/clientes:
    La recolección, almacenamiento, uso y/o circulación de los datos personales de usuarios de VaPaEsa COL SAS tiene como finalidad principal prestar los servicios ofrecidos y/o contratados de forma adecuada y con una excelente calidad. Por lo anterior, la finalidad de recolección y tratamiento de los Datos Personales de los Usuarios y Clientes serán las siguientes: Ordenar, catalogar, clasificar, dividir o separar y almacenar los datos personales dentro de los sistemas y archivos de VaPaEsa COL SAS.
    •	Creación y administración de la cuenta del usuario.
    •	Prestar el mantenimiento, desarrollo y/o control de la relación comercial entre el Titular del dato personal y VaPaEsa.
    •	Proveer a los usuarios de la información necesaria, a través de la página Web y aplicación, sobre los productos de los proveedores, para formalizar la relación de consumo de dichos productos.
    •	Realizar procesos al interior de la empresa, con fines de desarrollo operativo y/o de administración de sistemas.
    •	Prestar los servicios de la empresa y realizar el seguimiento de acuerdo con las necesidades particulares del usuario, con el fin de brindar los servicios y productos adecuados para cubrir sus necesidades específicas.
    •	Realizar el envío de información de novedades, publicidad, marketing o ventas a distancia. Haciendo uso de medios tales como, correo electrónico, notificaciones PUSH, mensajes de texto (SMS), ofertas de productos y/o servicios encontrados en la página web y la aplicación.
    •	Llevar un registro histórico de la información, con fines de satisfacción al usuario desarrollando análisis sobre los intereses y necesidades; brindando de esta manera un mejor servicio.
    •	Realizar estrategias de mercado mediante el estudio del comportamiento del usuario frente a las ofertas y con ello mejorar en su contenido, personalizando presentación y servicio.
    •	Elaboración de prospecciones comerciales y segmentación de mercados.
    •	Realizar encuestas de satisfacción, para calificar el servicio y la atención por medio de los canales dispuestos para ello.
    •	Adelantar las actividades necesarias para gestionar las solicitudes, quejas y reclamos de los usuarios de la empresa o terceros; y direccionarlos a las áreas responsables de emitir las respuestas correspondientes.
    De llegarse a presentar otro tipo de finalidades en el tratamiento de datos personales se solicitará la autorización previa, expresa e informada del Titular.

    Empleados y socios:
    Antes de iniciar la relación laboral, VaPaEsa COL SAS informará a los candidatos en los procesos de selección las finalidades del tratamiento que se les dará a los datos personales que suministren en dicho proceso, y se encargará de solicitar la correspondiente autorización para su tratamiento, que se limitará a:
    •	Clasificar, almacenar y archivar los datos personales de los candidatos de los procesos de selección.
    •	Verificar y obtener referencias de personas naturales o jurídicas, antiguos empleadores suministradas por los candidatos en hojas de vida, formularios, entre otros.
    •	Entregar o transmitir la información a terceros encargados de los procesos de selección.
    •	Verificar, comparar y evaluar las competencias laborales y personales de los prospectos respecto de los criterios de selección.
    •	Cumplir con los deberes legales a los que está obligada la empresa.
    •	Envío ofertas de trabajo.
    •	Realizar mantenimiento, desarrollo y/o control de la relación laboral entre el Titular del dato y VaPaEsa COL SAS.
    •	Adelantar procesos al interior de la empresa, con fines de desarrollo operativo y/o de administración de sistemas.
    Colaboradores Prestadores de Servicios:
    La recolección y tratamiento de datos personales de los usuarios/repartidor se hará con el fin de controlar el servicio de intermediación que ofrece VaPaEsa COL SAS velando por el buen servicio al usuario, para ello se disponen los siguientes aspectos:
    •	Adelantar procesos al interior de la empresa, con fines de desarrollo operativo y/o de administración de sistemas.
    •	Brindarle capacitación permanente al usuario/repartidor sobre el uso de la aplicación de la empresa.
    •	Llevar control del número de usuarios/repartidor que proveen los servicios de logística a través de la plataforma de VaPaEsa.
    •	Realizar gestión de estadísticas internas, con el fin de hacer seguimiento al servicio.
    •	Verificar y obtener referencias de personas naturales o jurídicas, antiguos empleadores suministradas por los candidatos en hojas de vida, formularios, entre otros.
    •	Creación de un usuario en los sistemas de VaPaEsa para llevar a cabo las funciones del usuario/repartidor.
    Proveedores:
    La recolección y tratamiento de los datos personales de los proveedores se hará con el fin de contactar y exhibir los productos y/o servicios que VaPaEsa COL SAS requiera de ellos para ofrecer a los clientes a través de la aplicación y también con los siguientes objetivos:
    1)	Mantener un registro de la información y relación con proveedores.
    2)	Verificar la información aportada por los proveedores, para controlar y prevenir el fraude.
    3)	Gestionar procedimientos administrativos para desarrollar cualquier otra actividad en cumplimiento de la relación entre proveedores y VaPaEsa COL SAS.
    Para otras finalidades o tratamiento se pedirá autorización previa, expresa e informada al Titular.
    <br>
    7.	Autorización y Consentimiento del Titular
    El consentimiento y autorización por parte del Titular de la información es un requisito constitucional y legal que debe cumplir las personas responsables del tratamiento de datos personales. El consentimiento debe cumplir con los siguientes presupuestos:
    Previo: La autorización la debe dar el Titular de información de manera previa a cualquier tipo de Tratamiento de datos personales.
    Expreso: La autorización debe otorgarse de forma inequívoca, clara y específica.
    Informado: El Titular debe comprender claramente para qué serán tratados sus datos personales y las finalidades que pueden derivarse del Tratamiento de estos.
    Todos los visitantes de la Plataforma de VaPaEsa COL SAS deben registrarse y autorizar el tratamiento de los datos personales para poder hacer uso de los servicios ofrecidos. A través de la aceptación de la “Política de privacidad y Tratamiento de Datos Personales” la cual debe ser leída y aceptada para poder continuar con el uso de los servicios de VaPaEsa COL SAS.
    Para la obtención o recolección de Datos Personales de los Titulares obtenidos antes de la vigencia del Decreto 1377 de 2013, se buscará obtener la autorización a través de mecanismos eficientes de comunicación. Se entiende por mecanismos eficientes de comunicación aquellos que la Compañía usa en el curso ordinario de su interacción con los Titulares como correos electrónicos, llamadas telefónicas entre otros.
    <br>
    8.	Recolección y uso de los datos:
    VaPaEsa realiza la recopilación de los siguientes datos:
    8.1	Datos recopilados de usuarios:
    8.1.1	Información de perfil de usuario: se realiza la recopilación de datos al momento del usuario crear o actualizar la cuenta dentro de la App VaPaEsa y al momento de solicitar servicios de la aplicación, esto incluye nombre y apellido del usuario, documento de identificación, correo electrónico, numero de celular, país, ciudad, sector y dirección.
    8.1.2	Información de verificación de antecedentes(colaboradores): esta información es recopilada una vez se ha registrado el colaborador en la App es solicitada por medio de correo electrónico antecedentes legales, historial de conducción, documentación del vehículo, estado de licencia.
    8.1.3	Verificación de identidad por medio de foto: serán recopiladas fotos de los usuarios solicitadas por correo una vez registrados. Las fotos pueden ser usadas para la verificar la identidad del usuario, para brindar seguridad en los servicios identificando los prestadores de estos.
    8.1.4	Datos demográficos: recopilación de datos demográficos como edad, genero, dirección, gustos de los usuarios por medios de encuestas, eventos y hojas de vida.
    8.1.5	Contenido de usuario: recopilación de datos de los usuarios al momento de solicitar servicios por medios telefónicos, chat de WhatsApp, contactar soporte al cliente.
    8.2	Datos generados en el uso de los servicios de la App:
    8.2.1	Datos de ubicación (colaboradores prestadores de servicios en la App): se recopila datos de la ubicación aproximada del dispositivo móvil del colaborador cuando la App de VaPaEsa coloca como disponible al colaborador para recibir servicios.
    8.2.2	Datos de ubicación (usuarios y destinatarios): recopilación de datos de la ubicación aproximada o precisa ingresada de manera manual en la App por los usuarios al momento de solicitar servicios.
    8.2.3	Información de servicios: recopilación de datos sobre el uso de los servicios como el tipo de servicio utilizado, los detalles del servicio (dirección inicial y destino final, artículos enviados o solicitados), información sobre el tipo de método de pago.

    <br>
    9.	UTILIZACION DE DATOS
    En VaPaEsa utilizamos los datos recopilados para que nuestros servicios prestados tengan una alta seguridad y confiabilidad.
    Utilizamos los datos de la siguiente manera:
    9.1.	Utilización de los servicios:
    9.1.1.	Se utilizan los datos para poder actualizar y crear cuentas.
    9.1.2.	El uso de los datos de ubicación para asignar los servicios de una manera eficiente con el colaborador más cercano y disponible al punto de inicio del servicio.
    9.1.3.	Compartir los datos entre los colaboradores y usuarios como lo son el nombre, teléfono, precio del servicio, direcciones, calificaciones, datos del vehículo.
    9.2.	 Seguridad:
    9.2.1.	Utilización de los datos para brindar seguridad y mantener la integridad de los datos de los usuarios y de nuestros servicios al realizar la verificación de la identidad y de los requisitos y la verificación previa de los antecedentes de los colaboradores y usuarios, para evitar prestar servicios con personas de poca confiabilidad.
    9.2.2.	El uso de fotografías o selfis para verificación y prever los fraudes en los momentos de prestar los servicios de entrega o recepción, así tanto los usuarios y colaboradores no sean victimas de robo de identidad.
    <br>
    10.	Vigencia de la Política
    Los Datos Personales que sean almacenados, utilizados o transmitidos permanecerán en las bases de datos de VaPaEsa COL SAS durante el tiempo que sea necesario para cumplir con las finalidades expuestas en esta política o para que la Empresa pueda cumplir con sus deberes legales.
    Sin embargo, la información será revisada cada año para verificar la veracidad del dato y finalidad de seguir con su tratamiento.
    De ser necesario VaPaEsa COL SAS se reserva el derecho a modificar la presente Política de forma unilateral.
    `
    +'<style> ion-checkbox#aut_contrato{padding: 5px 0px 0px 4px} #alert-1-msg{text-align: justify} .alert-message {text-align: justify}  .labelAcepto{display: inline} div{display: block}   </style>'*/


    this.auth.getMessageTC().subscribe(data => {
      this.message_TC = data[0]['body'];
     console.log(data, 'Data received in component');
    });

  }



  async presentAlert() {
    const alert = await this.alertController.create({

      header: `Política de Tratamiento de Datos Personale
      (Política de Privacidad)`
      ,
message:this.message_TC+'<style> ion-checkbox#aut_contrato{padding: 5px 0px 0px 4px} #alert-1-msg{text-align: justify} .alert-message {text-align: justify}  .labelAcepto{display: inline} div{display: block}   </style> ',
      // al hacer check, vamos a establecer una variable y al darle aceptar preguntamos si esa varibale esta definida si esta se continua

    });

    await alert.present();



   }

  async guardar(){
console.log(this.regisForm.value || this.regisForm.value['field_acepta_terminos_registro'] != "");

    if(this.regisForm.invalid){
      const alert = await this.alertController.create({

        header: 'Datos incompletos o debe Aceptar terminos y condiciones',

        message: 'Llenar todos los datos.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;


     }else{
      this.auth.register(this.regisForm.value);

     }



   /*
    this.auth.register(this.regisForm).subscribe(async res =>{
      console.log(res);
    })
   // esto no esta bien, tienes que convertir la variable antes


this.auth.register(this.regisForm.value).subscribe(async res =>{
  console.log(res);
})
*/
     /*

   console.log( this.auth.register().subscribe(async res =>{
console.log(res['error'])
   }))

     */




    /*
    if(this.auth.sesionAnonima ==null){

      console.log('usuario creado');
    }else{
      console.log('usuario no creado');
      console.log(this.auth.sesionAnonima);
    }
    */
    //console.log(JSON.stringify(this.regisForm.value))

  }
}

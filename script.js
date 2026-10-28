
const formulario = document.getElementById("formulario-simulacion");
const resultado = document.getElementById("resultado");

const escenarios = {
  sismo: {
    nombre: "Sismo",
    descripcion:
      "El escenario representa un posible movimiento sísmico y la necesidad de actuar de manera organizada.",
    recomendaciones: [
      "Durante el movimiento, agacharse, cubrirse y sujetarse en un lugar seguro, si es posible.",
      "Alejarse de ventanas y objetos que puedan caer.",
      "Cuando termine el movimiento, evacuar solo cuando sea seguro y siguiendo las indicaciones oficiales.",
      "Dirigirse al punto de encuentro establecido y no volver a ingresar hasta recibir autorización."
    ]
  },

  zonda: {
    nombre: "Viento Zonda",
    descripcion:
      "El escenario contempla ráfagas fuertes, polvo, objetos sueltos y posibles dificultades de circulación.",
    recomendaciones: [
      "Consultar las alertas meteorológicas y las indicaciones de las autoridades.",
      "Permanecer en un lugar seguro, cerrar puertas y ventanas y alejarse de objetos que puedan caer.",
      "Evitar actividades al aire libre y no acercarse a cables caídos.",
      "Si estás conduciendo, reducir los riesgos y detenerte en un lugar seguro cuando las condiciones lo permitan."
    ]
  },

  aluvion: {
    nombre: "Aluvión",
    descripcion:
      "El escenario considera lluvias intensas, escorrentías y posibles crecidas repentinas.",
    recomendaciones: [
      "Prestar atención a las alertas y órdenes de evacuación.",
      "Alejarse de cauces, badenes y zonas inundables.",
      "No cruzar corrientes de agua a pie ni en vehículo.",
      "Dirigirse a una zona segura siguiendo las rutas indicadas por las autoridades."
    ]
  },

  tormenta: {
    nombre: "Tormenta severa",
    descripcion:
      "El escenario representa condiciones meteorológicas adversas que pueden afectar la circulación y la seguridad.",
    recomendaciones: [
      "Consultar los avisos meteorológicos oficiales.",
      "Refugiarse en un edificio seguro y alejarse de ventanas.",
      "No permanecer debajo de árboles ni cerca de postes o cables eléctricos.",
      "Evitar calles anegadas y seguir las instrucciones de las autoridades."
    ]
  },

  incendio: {
    nombre: "Incendio",
    descripcion:
      "El escenario plantea la necesidad de reconocer salidas y evacuar evitando el humo y otras amenazas.",
    recomendaciones: [
      "Activar la alarma y avisar a los servicios de emergencia.",
      "Evacuar por una salida segura sin correr ni empujar.",
      "No utilizar ascensores y mantenerse alejado del humo.",
      "Una vez fuera, no volver a entrar al edificio."
    ]
  }
};

const lugares = {
  escuela: "Escuela",
  vivienda: "Vivienda",
  edificio: "Edificio público",
  "espacio-abierto": "Espacio abierto",
  ruta: "Ruta o vía de circulación"
};

function crearElemento(etiqueta, texto, clase = "") {
  const elemento = document.createElement(etiqueta);

  if (clase) {
    elemento.className = clase;
  }

  elemento.textContent = texto;
  return elemento;
}

function generarSimulacion(evento) {
  evento.preventDefault();

  const tipo = document.getElementById("tipo-emergencia").value;
  const personas = Number(document.getElementById("personas").value);
  const salidas = Number(document.getElementById("salidas").value);
  const ubicacion = document.getElementById("ubicacion").value;

  if (
    !escenarios[tipo] ||
    !Number.isInteger(personas) ||
    personas < 1 ||
    personas > 10000 ||
    !Number.isInteger(salidas) ||
    !lugares[ubicacion]
  ) {
    resultado.replaceChildren(
      crearElemento("h3", "Revisá los datos"),
      crearElemento(
        "p",
        "Ingresá una cantidad válida de personas y verificá las opciones seleccionadas."
      )
    );
    return;
  }

  const escenario = escenarios[tipo];

  resultado.replaceChildren();

  resultado.appendChild(
    crearElemento("h3", "Resultado del escenario")
  );

  resultado.appendChild(
    crearElemento("p", "Escenario: " + escenario.nombre, "dato")
  );

  resultado.appendChild(
    crearElemento("p", "Lugar: " + lugares[ubicacion])
  );

  resultado.appendChild(
    crearElemento("p", "Personas consideradas: " + personas)
  );

  resultado.appendChild(
    crearElemento("p", "Salidas disponibles: " + salidas)
  );

  resultado.appendChild(
    crearElemento("h4", "Descripción")
  );

  resultado.appendChild(
    crearElemento("p", escenario.descripcion)
  );

  resultado.appendChild(
    crearElemento("h4", "Recomendaciones generales")
  );

  const lista = document.createElement("ul");

  escenario.recomendaciones.forEach(function (recomendacion) {
    lista.appendChild(crearElemento("li", recomendacion));
  });

  resultado.appendChild(lista);

  resultado.appendChild(
    crearElemento(
      "h4",
      "Aspectos para analizar"
    )
  );

  const analisis = [];

  if (salidas === 1) {
    analisis.push(
      "El escenario tiene una sola salida disponible. Conviene revisar alternativas seguras y los protocolos de evacuación."
    );
  } else {
    analisis.push(
      "Revisar que las salidas estén señalizadas, sean accesibles y permanezcan libres de obstáculos."
    );
  }

  if (personas >= 200) {
    analisis.push(
      "Al considerar una cantidad elevada de personas, es importante evaluar la organización de los grupos y evitar aglomeraciones."
    );
  } else {
    analisis.push(
      "Verificar que todas las personas conozcan las salidas y el punto de encuentro."
    );
  }

  if (ubicacion === "escuela") {
    analisis.push(
      "Considerar la presencia de estudiantes, docentes y personas que puedan necesitar asistencia."
    );
  }

  if (ubicacion === "vivienda") {
    analisis.push(
      "Considerar a niños, adultos mayores, personas con discapacidad y mascotas al planificar la preparación."
    );
  }

  if (ubicacion === "edificio") {
    analisis.push(
      "Revisar la señalización, las escaleras y los procedimientos establecidos para el edificio."
    );
  }

  if (ubicacion === "espacio-abierto") {
    analisis.push(
      "Identificar un punto de encuentro seguro y considerar las condiciones del entorno."
    );
  }

  if (ubicacion === "ruta") {
    analisis.push(
      "Considerar las condiciones del tránsito y seguir las indicaciones de las autoridades viales."
    );
  }

  const listaAnalisis = document.createElement("ul");

  analisis.forEach(function (punto) {
    listaAnalisis.appendChild(crearElemento("li", punto));
  });

  resultado.appendChild(listaAnalisis);

  resultado.appendChild(
    crearElemento(
      "p",
      "Este resultado es orientativo: no calcula tiempos reales de evacuación ni determina rutas seguras."
    , "aviso")
  );
}

formulario.addEventListener("submit", generarSimulacion);

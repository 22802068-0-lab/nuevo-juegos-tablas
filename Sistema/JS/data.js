/**
 * data.js - Banco de Contenidos Pedagógicos "Mis Tablas"
 * Tablas del 2 al 10, Representaciones Visuales, Trucos Secretos, 
 * Preguntas SIMCE contextualizadas y Sistema de Logros.
 */

const TABLES_DATA = {
  2: {
    num: 2,
    title: "Tabla del 2: ¡Los Dobles!",
    subtitle: "Duplica números con facilidad",
    color: "#FF6B6B",
    icon: "✌️",
    trick: "¡El secreto de los dobles! Todo número multiplicado por 2 es sumarse a sí mismo (ej: 2 × 4 es 4 + 4 = 8). Además, ¡todos los resultados terminan en números pares: 0, 2, 4, 6 u 8!",
    items: [
      { a: 2, b: 1, res: 2, rep: "2", context: "2 calcetines (1 par)" },
      { a: 2, b: 2, res: 4, rep: "2 + 2", context: "2 pares de zapatos" },
      { a: 2, b: 3, res: 6, rep: "3 + 3", context: "2 triciclos tienen 6 ruedas en total" },
      { a: 2, b: 4, res: 8, rep: "4 + 4", context: "2 carritos con 4 ruedas cada uno" },
      { a: 2, b: 5, res: 10, rep: "5 + 5", context: "Las dos manos tienen 10 dedos" },
      { a: 2, b: 6, res: 12, rep: "6 + 6", context: "2 medias docenas de huevos = 12 huevos" },
      { a: 2, b: 7, res: 14, rep: "7 + 7", context: "2 semanas tienen 14 días en total" },
      { a: 2, b: 8, res: 16, rep: "8 + 8", context: "2 pulpos tienen 16 tentáculos" },
      { a: 2, b: 9, res: 18, rep: "9 + 9", context: "2 equipos de béisbol de 9 jugadores" },
      { a: 2, b: 10, res: 20, rep: "10 + 10", context: "2 billetes de 10 monedas" }
    ]
  },
  3: {
    num: 3,
    title: "Tabla del 3: ¡Saltos Triples!",
    subtitle: "Multiplicar es sumar tres veces",
    color: "#FFA502",
    icon: "🥉",
    trick: "¡El truco del 2 + 1! Si multiplicas por 3, primero calcula el doble y luego súmale el número una vez más. Por ejemplo: 3 × 6 = el doble de 6 es 12, más 6 = ¡18!",
    items: [
      { a: 3, b: 1, res: 3, rep: "3", context: "1 triángulo tiene 3 lados" },
      { a: 3, b: 2, res: 6, rep: "2 + 2 + 2", context: "3 pares de guantes = 6 guantes" },
      { a: 3, b: 3, res: 9, rep: "3 + 3 + 3", context: "3 tríos de música = 9 cantantes" },
      { a: 3, b: 4, res: 12, rep: "4 + 4 + 4", context: "3 mesas de 4 patas = 12 patas" },
      { a: 3, b: 5, res: 15, rep: "5 + 5 + 5", context: "3 monedas de $5 = $15" },
      { a: 3, b: 6, res: 18, rep: "6 + 6 + 6", context: "3 filas con 6 estudiantes = 18 estudiantes" },
      { a: 3, b: 7, res: 21, rep: "7 + 7 + 7", context: "3 semanas completas = 21 días" },
      { a: 3, b: 8, res: 24, rep: "8 + 8 + 8", context: "3 cajas con 8 lápices de colores = 24 lápices" },
      { a: 3, b: 9, res: 27, rep: "9 + 9 + 9", context: "3 paquetes de 9 galletas = 27 galletas" },
      { a: 3, b: 10, res: 30, rep: "10 + 10 + 10", context: "3 decenas = 30 unidades" }
    ]
  },
  4: {
    num: 4,
    title: "Tabla del 4: ¡El Doble del Doble!",
    subtitle: "Duplica una vez y vuelve a duplicar",
    color: "#2ED573",
    icon: "🍀",
    trick: "¡El doble del doble! Para multiplicar cualquier número por 4, sácalo al doble dos veces. Por ejemplo: 4 × 7 -> el doble de 7 es 14, y el doble de 14 es ¡28!",
    items: [
      { a: 4, b: 1, res: 4, rep: "4", context: "1 trébol de 4 hojas" },
      { a: 4, b: 2, res: 8, rep: "2 + 2 + 2 + 2", context: "4 pares de calcetas = 8 calcetas" },
      { a: 4, b: 3, res: 12, rep: "3 + 3 + 3 + 3", context: "4 cajas con 3 jugos = 12 jugos" },
      { a: 4, b: 4, res: 16, rep: "4 + 4 + 4 + 4", context: "4 autos con 4 ruedas = 16 ruedas" },
      { a: 4, b: 5, res: 20, rep: "5 + 5 + 5 + 5", context: "4 billetes de $5 = $20" },
      { a: 4, b: 6, res: 24, rep: "6 + 6 + 6 + 6", context: "4 dados con 6 caras cada uno" },
      { a: 4, b: 7, res: 28, rep: "7 + 7 + 7 + 7", context: "4 semanas del mes = 28 días" },
      { a: 4, b: 8, res: 32, rep: "8 + 8 + 8 + 8", context: "4 paquetes con 8 yogures = 32 yogures" },
      { a: 4, b: 9, res: 36, rep: "9 + 9 + 9 + 9", context: "4 cuadernos de 9 stickers = 36 stickers" },
      { a: 4, b: 10, res: 40, rep: "10 + 10 + 10 + 10", context: "4 billetes de $10 = $40" }
    ]
  },
  5: {
    num: 5,
    title: "Tabla del 5: ¡El Ritmo de las Manos!",
    subtitle: "Siempre termina en 0 o en 5",
    color: "#1E90FF",
    icon: "🖐️",
    trick: "¡El patrón del 0 y el 5! Si cuentas de 5 en 5 (5, 10, 15, 20...) notarás que las respuestas siempre terminan en 0 o en 5. ¡Si el número es par termina en 0, y si es impar termina en 5!",
    items: [
      { a: 5, b: 1, res: 5, rep: "5", context: "Los 5 dedos de una mano" },
      { a: 5, b: 2, res: 10, rep: "5 + 5", context: "Los 10 dedos de las dos manos" },
      { a: 5, b: 3, res: 15, rep: "5 + 5 + 5", context: "15 minutos (un cuarto de hora)" },
      { a: 5, b: 4, res: 20, rep: "5 + 5 + 5 + 5", context: "5 billetes de $4 o 4 de $5 = $20" },
      { a: 5, b: 5, res: 25, rep: "5 + 5 + 5 + 5 + 5", context: "5 bolsitas con 5 canicas = 25 canicas" },
      { a: 5, b: 6, res: 30, rep: "5 + 5 + 5 + 5 + 5 + 5", context: "Media hora en el reloj = 30 minutos" },
      { a: 5, b: 7, res: 35, rep: "5 × 7", context: "5 semanas con 7 días escolares = 35 días" },
      { a: 5, b: 8, res: 40, rep: "5 × 8", context: "5 cajas de 8 lápices de cera = 40 lápices" },
      { a: 5, b: 9, res: 45, rep: "5 × 9", context: "3 cuartos de hora en el reloj = 45 minutos" },
      { a: 5, b: 10, res: 50, rep: "5 × 10", context: "5 monedas de $10 = $50" }
    ]
  },
  6: {
    num: 6,
    title: "Tabla del 6: ¡Medias Docenas!",
    subtitle: "El doble de la tabla del 3",
    color: "#9B59B6",
    icon: "🎲",
    trick: "¡El secreto de multiplicar por 5 y sumar uno! Por ejemplo: 6 × 7 = primero haz 5 × 7 = 35, y luego súmale otro 7 = ¡42! También es el doble exacto de la tabla del 3.",
    items: [
      { a: 6, b: 1, res: 6, rep: "6", context: "Las 6 caras de un dado de juego" },
      { a: 6, b: 2, res: 12, rep: "6 + 6", context: "1 docena completa = 12 unidades" },
      { a: 6, b: 3, res: 18, rep: "6 + 6 + 6", context: "6 triángulos (3 lados cada uno) = 18 lados" },
      { a: 6, b: 4, res: 24, rep: "6 + 6 + 6 + 6", context: "Las 24 horas completas de un día" },
      { a: 6, b: 5, res: 30, rep: "6 × 5", context: "6 paquetes de 5 galletas = 30 galletas" },
      { a: 6, b: 6, res: 36, rep: "6 × 6", context: "6 filas de 6 baldosas en el piso = 36 baldosas" },
      { a: 6, b: 7, res: 42, rep: "6 × 7", context: "6 semanas de 7 días = 42 días" },
      { a: 6, b: 8, res: 48, rep: "6 × 8", context: "6 cajas con 8 témperas = 48 témperas" },
      { a: 6, b: 9, res: 54, rep: "6 × 9", context: "6 sobres con 9 figuritas = 54 figuritas" },
      { a: 6, b: 10, res: 60, rep: "6 × 10", context: "60 segundos = 1 minuto completo" }
    ]
  },
  7: {
    num: 7,
    title: "Tabla del 7: ¡Las Semanas Mágicas!",
    subtitle: "Contar de 7 en 7 como los días del calendario",
    color: "#E67E22",
    icon: "📅",
    trick: "¡Descompón en 5 y 2! El 7 es 5 + 2. Si quieres calcular 7 × 8, haz: (5 × 8) + (2 × 8) = 40 + 16 = ¡56! ¡Fácil y sin equivocarse!",
    items: [
      { a: 7, b: 1, res: 7, rep: "7", context: "Los 7 días de una semana" },
      { a: 7, b: 2, res: 14, rep: "7 + 7", context: "2 semanas completas = 14 días" },
      { a: 7, b: 3, res: 21, rep: "7 + 7 + 7", context: "3 semanas de vacaciones = 21 días" },
      { a: 7, b: 4, res: 28, rep: "7 + 7 + 7 + 7", context: "4 semanas = 28 días (mes de febrero)" },
      { a: 7, b: 5, res: 35, rep: "7 × 5", context: "7 bolsitas con 5 monedas de chocolate = 35 monedas" },
      { a: 7, b: 6, res: 42, rep: "7 × 6", context: "7 dados mostrando la cara del 6 = 42 puntos" },
      { a: 7, b: 7, res: 49, rep: "7 × 7", context: "Un tablero cuadrado de 7 por 7 casillas = 49 casillas" },
      { a: 7, b: 8, res: 56, rep: "7 × 8", context: "¡El famoso 5-6-7-8! (56 = 7 × 8)" },
      { a: 7, b: 9, res: 63, rep: "7 × 9", context: "7 cajas con 9 marcadores de pizarra = 63 marcadores" },
      { a: 7, b: 10, res: 70, rep: "7 × 10", context: "7 decenas = 70 unidades" }
    ]
  },
  8: {
    num: 8,
    title: "Tabla del 8: ¡El Triple Doble!",
    subtitle: "El poder del pulpo multiplicador",
    color: "#00CEC9",
    icon: "🐙",
    trick: "¡Duplica tres veces! Como 8 es 2 × 2 × 2, para multiplicar por 8 solo dobla el número 3 veces. Ej: 8 × 6 -> Doble de 6 = 12 -> Doble de 12 = 24 -> Doble de 24 = ¡48!",
    items: [
      { a: 8, b: 1, res: 8, rep: "8", context: "Los 8 tentáculos de 1 pulpo" },
      { a: 8, b: 2, res: 16, rep: "8 + 8", context: "2 pulpos = 16 tentáculos" },
      { a: 8, b: 3, res: 24, rep: "8 + 8 + 8", context: "8 triángulos de 3 lados = 24 lados" },
      { a: 8, b: 4, res: 32, rep: "8 × 4", context: "8 sillas con 4 patas = 32 patas" },
      { a: 8, b: 5, res: 40, rep: "8 × 5", context: "8 manos de 5 dedos = 40 dedos" },
      { a: 8, b: 6, res: 48, rep: "8 × 6", context: "8 cajas con 6 alfajores = 48 alfajores" },
      { a: 8, b: 7, res: 56, rep: "8 × 7", context: "8 semanas de 7 días = 56 días" },
      { a: 8, b: 8, res: 64, rep: "8 × 8", context: "Las 64 casillas del tablero de ajedrez" },
      { a: 8, b: 9, res: 72, rep: "8 × 9", context: "8 filas de 9 butacas en el teatro = 72 butacas" },
      { a: 8, b: 10, res: 80, rep: "8 × 10", context: "8 billetes de $10 = $80" }
    ]
  },
  9: {
    num: 9,
    title: "Tabla del 9: ¡La Magia de los Dígitos!",
    subtitle: "La tabla con los trucos más asombrosos",
    color: "#E84393",
    icon: "🎩",
    trick: "¡El truco de sumar 9! La suma de los dos dígitos del resultado SIEMPRE da 9: 18 (1+8=9), 27 (2+7=9), 36 (3+6=9)... ¡y además es multiplicar por 10 y restar el mismo número! (9 × 6 = 60 - 6 = 54).",
    items: [
      { a: 9, b: 1, res: 9, rep: "9", context: "1 equipo de béisbol en cancha" },
      { a: 9, b: 2, res: 18, rep: "9 + 9", context: "1 + 8 = 9 (¡Truco comprobado!)" },
      { a: 9, b: 3, res: 27, rep: "9 × 3", context: "2 + 7 = 9 (¡27 flores en el jardín!)" },
      { a: 9, b: 4, res: 36, rep: "9 × 4", context: "3 + 6 = 9 (36 lápices en 4 estuches)" },
      { a: 9, b: 5, res: 45, rep: "9 × 5", context: "4 + 5 = 9 (45 minutos de clase)" },
      { a: 9, b: 6, res: 54, rep: "9 × 6", context: "5 + 4 = 9 (54 cartas en la baraja)" },
      { a: 9, b: 7, res: 63, rep: "9 × 7", context: "6 + 3 = 9 (63 páginas de un libro)" },
      { a: 9, b: 8, res: 72, rep: "9 × 8", context: "7 + 2 = 9 (72 lápices de colores)" },
      { a: 9, b: 9, res: 81, rep: "9 × 9", context: "8 + 1 = 9 (81 baldosas cuadradas)" },
      { a: 9, b: 10, res: 90, rep: "9 × 10", context: "9 decenas = 90 unidades" }
    ]
  },
  10: {
    num: 10,
    title: "Tabla del 10: ¡El Cero Mágico!",
    subtitle: "La más rápida y divertida de todas",
    color: "#6C5CE7",
    icon: "🎯",
    trick: "¡El cero mágico! Para multiplicar cualquier número por 10, simplemente escribe el mismo número y agrégale un cero al final. Ej: 10 × 7 = escribe el 7 y agrega el 0 -> ¡70!",
    items: [
      { a: 10, b: 1, res: 10, rep: "10", context: "1 decena completa" },
      { a: 10, b: 2, res: 20, rep: "10 + 10", context: "2 monedas de $10 = $20" },
      { a: 10, b: 3, res: 30, rep: "10 × 3", context: "3 cajas de 10 mascarillas = 30" },
      { a: 10, b: 4, res: 40, rep: "10 × 4", context: "4 decenas de manzanas = 40 manzanas" },
      { a: 10, b: 5, res: 50, rep: "10 × 5", context: "5 billetes de $10 = $50" },
      { a: 10, b: 6, res: 60, rep: "10 × 6", context: "6 decenas de huevos = 60 huevos" },
      { a: 10, b: 7, res: 70, rep: "10 × 7", context: "7 paquetes de 10 hojas de papel lustre = 70 hojas" },
      { a: 10, b: 8, res: 80, rep: "10 × 8", context: "8 monedas de $10 = $80" },
      { a: 10, b: 9, res: 90, rep: "10 × 9", context: "9 cajas con 10 lápices = 90 lápices" },
      { a: 10, b: 10, res: 100, rep: "10 × 10", context: "¡10 decenas forman una centena completa: 100!" }
    ]
  }
};

/**
 * Banco de Preguntas contextualizadas Tipo SIMCE Matemática 4° Básico
 * Formato oficial: Contexto real, opciones A, B, C, D y retroalimentación pedagógica
 */
const SIMCE_QUESTIONS = [
  {
    id: 1,
    topic: "Compras y Precios",
    context: "En el kiosco saludable de la escuela, cada cajita de jugo cuesta $350 y cada paquete de galletas de avena cuesta $400. Tomás compró 4 paquetes de galletas de avena.",
    question: "¿Cuánto dinero gastó Tomás en total por las galletas?",
    imageIcon: "🍪",
    options: [
      { id: "A", text: "$800" },
      { id: "B", text: "$1.200" },
      { id: "C", text: "$1.600" },
      { id: "D", text: "$2.000" }
    ],
    correct: "C",
    explanation: "Para calcular el gasto total, multiplicamos la cantidad de paquetes por el precio de cada uno: 4 × $400 = $1.600. (4 × 4 = 16 y agregamos los dos ceros)."
  },
  {
    id: 2,
    topic: "Organización de Filas y Columnas",
    context: "En el gimnasio de la escuela se acomodaron 8 filas de sillas para la presentación del Día del Libro. En cada fila se colocaron 9 sillas.",
    question: "¿Cuántas sillas se colocaron en total en el gimnasio?",
    imageIcon: "🪑",
    options: [
      { id: "A", text: "17 sillas" },
      { id: "B", text: "63 sillas" },
      { id: "C", text: "72 sillas" },
      { id: "D", text: "81 sillas" }
    ],
    correct: "C",
    explanation: "Cuando los objetos se ordenan en filas y columnas, calculamos el total multiplicando filas por columnas: 8 × 9 = 72 sillas en total."
  },
  {
    id: 3,
    topic: "Distribución de Materiales Escolares",
    context: "La profesora de Artes de 4° básico tiene 6 cajas con témperas. Cada caja contiene 8 frascos de témpera de distintos colores.",
    question: "¿Cuántos frascos de témpera tiene la profesora en total para la clase?",
    imageIcon: "🎨",
    options: [
      { id: "A", text: "48 frascos" },
      { id: "B", text: "54 frascos" },
      { id: "C", text: "42 frascos" },
      { id: "D", text: "14 frascos" }
    ],
    correct: "A",
    explanation: "Calculamos multiplicando el número de cajas por la cantidad en cada una: 6 × 8 = 48 frascos de témpera."
  },
  {
    id: 4,
    topic: "Tiempo y Calendario",
    context: "Camila se prepara para una carrera interescolar y entrena durante 7 semanas consecutivas. Si ella entrena exactamente 5 días en cada semana.",
    question: "¿Cuántos días entrenó Camila en total?",
    imageIcon: "🏃‍♀️",
    options: [
      { id: "A", text: "12 días" },
      { id: "B", text: "30 días" },
      { id: "C", text: "35 días" },
      { id: "D", text: "40 días" }
    ],
    correct: "C",
    explanation: "Multiplicamos la cantidad de semanas por los días entrenados por semana: 7 semanas × 5 días = 35 días en total."
  },
  {
    id: 5,
    topic: "Juegos y Puntajes",
    context: "En la kermés del colegio, Matías participó en el juego de tiro al blanco. Logró acertar 6 veces en la zona que otorga 7 puntos por acierto.",
    question: "¿Cuál fue el puntaje total que obtuvo Matías?",
    imageIcon: "🎯",
    options: [
      { id: "A", text: "13 puntos" },
      { id: "B", text: "42 puntos" },
      { id: "C", text: "49 puntos" },
      { id: "D", text: "36 puntos" }
    ],
    correct: "B",
    explanation: "Para hallar el puntaje total, multiplicamos los aciertos por el puntaje de cada uno: 6 × 7 = 42 puntos."
  },
  {
    id: 6,
    topic: "Empaques y Repostería",
    context: "Una pastelería artesanal empaqueta alfajores en cajas de regalo. Cada caja contiene 6 alfajores. Si Don Pedro compró 5 cajas completas para compartir con su familia.",
    question: "¿Cuántos alfajores compró Don Pedro en total?",
    imageIcon: "🧁",
    options: [
      { id: "A", text: "25 alfajores" },
      { id: "B", text: "30 alfajores" },
      { id: "C", text: "35 alfajores" },
      { id: "D", text: "11 alfajores" }
    ],
    correct: "B",
    explanation: "Calculamos grupos iguales: 5 cajas de 6 alfajores cada una es 5 × 6 = 30 alfajores."
  },
  {
    id: 7,
    topic: "Colecciones y Álbumes",
    context: "Joaquín colecciona láminas del álbum de animales chilenos. Compró 9 sobres sellados. Si cada sobre contiene 5 láminas en su interior.",
    question: "¿Cuántas láminas nuevas obtuvo Joaquín en total?",
    imageIcon: "🃏",
    options: [
      { id: "A", text: "40 láminas" },
      { id: "B", text: "45 láminas" },
      { id: "C", text: "50 láminas" },
      { id: "D", text: "14 láminas" }
    ],
    correct: "B",
    explanation: "Multiplicamos la cantidad de sobres por las láminas por sobre: 9 × 5 = 45 láminas."
  },
  {
    id: 8,
    topic: "Ahorro y Monedas Chilenas",
    context: "Sofía guarda en su alcancía monedas de $100. Al abrirla para comprar un libro, contó que tenía 8 monedas de $100.",
    question: "¿Cuánto dinero ahorró Sofía en total?",
    imageIcon: "💰",
    options: [
      { id: "A", text: "$600" },
      { id: "B", text: "$700" },
      { id: "C", text: "$800" },
      { id: "D", text: "$900" }
    ],
    correct: "C",
    explanation: "8 monedas de $100 equivalen a 8 × $100 = $800."
  },
  {
    id: 9,
    topic: "Huerto Escolar y Siembra",
    context: "En el taller de Ciencias Naturales, los estudiantes de 4° básico hicieron un huerto. Sembraron 7 hileras con 8 plantitas de lechuga en cada una.",
    question: "¿Cuántas plantas de lechuga sembraron en total en el huerto?",
    imageIcon: "🥬",
    options: [
      { id: "A", text: "56 plantas" },
      { id: "B", text: "54 plantas" },
      { id: "C", text: "49 plantas" },
      { id: "D", text: "64 plantas" }
    ],
    correct: "A",
    explanation: "Es un arreglo rectangular: 7 hileras × 8 plantas = 56 plantitas sembradas."
  },
  {
    id: 10,
    topic: "Transporte Escolar",
    context: "Un furgón escolar realiza 3 recorridos completos cada mañana para llevar estudiantes. En cada recorrido traslada a 10 estudiantes.",
    question: "¿A cuántos estudiantes traslada el furgón escolar cada mañana?",
    imageIcon: "🚌",
    options: [
      { id: "A", text: "13 estudiantes" },
      { id: "B", text: "20 estudiantes" },
      { id: "C", text: "30 estudiantes" },
      { id: "D", text: "33 estudiantes" }
    ],
    correct: "C",
    explanation: "Multiplicamos los 3 recorridos por 10 estudiantes en cada uno: 3 × 10 = 30 estudiantes."
  }
];

/**
 * Sistema de Logros y Recompensas
 */
const ACHIEVEMENTS_DATA = [
  {
    id: "primer_paso",
    title: "Primer Paso",
    desc: "Completaste tu primera actividad interactiva",
    icon: "👣",
    req: "Realizar 1 actividad con éxito"
  },
  {
    id: "maestro_doble",
    title: "Maestro del Doble",
    desc: "Dominaste la tabla del 2 al 100%",
    icon: "✌️",
    req: "Completar la tabla del 2"
  },
  {
    id: "manos_cinco",
    title: "Choca Esos Cinco",
    desc: "Completaste la tabla del 5 sin equivocarte",
    icon: "🖐️",
    req: "Completar la tabla del 5"
  },
  {
    id: "super_nueve",
    title: "Mente Brillante",
    desc: "Descubriste el secreto mágico de la tabla del 9",
    icon: "🎩",
    req: "Completar la tabla del 9"
  },
  {
    id: "memoria_de_elefante",
    title: "Memoria de Elefante",
    desc: "Ganaste una partida completa en el juego de memoria",
    icon: "🐘",
    req: "Completar Memoria Matemática"
  },
  {
    id: "rayo_veloz",
    title: "Rayo Veloz",
    desc: "Respondiste 8 o más desafíos contrarreloj a gran velocidad",
    icon: "⚡",
    req: "Aciertos contrarreloj"
  },
  {
    id: "detective_experto",
    title: "Detective Numérico",
    desc: "Descubriste los números ocultos usando las pistas",
    icon: "🕵️",
    req: "Completar Detective Matemático"
  },
  {
    id: "campeon_simce",
    title: "Héroe SIMCE 4° Básico",
    desc: "Rendiste el ensayo SIMCE y alcanzaste el nivel Adecuado",
    icon: "🏆",
    req: "Puntaje destacado en Ensayo SIMCE"
  }
];

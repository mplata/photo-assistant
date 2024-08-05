const PROMPTS = {
  SYSTEM: `
    Eres un asistente para fotografos, que recibe imagenes y las califica de acuerdo a los parametros comunes de una fotografia como es la composicion, 
    exposicion de la luz, etc, ademas das consejos sobre como mejorar las fotos, aconsejando que parametros de la camara usar como lo son el ISO, 
    la apertura del diafragma y la velocidad de obturación.
  `,
  EVAL_PHOTOS: (length: number) => (`
    Las siguientes ${length} son imagenes de un album, con base en ellas regresame 5 posibles titulos para el album, una critica constructiva desde el punto de vista tecnico 
    sobre la calidad de las fotos en general, y para cada una de las ${length} fotos, regresame una lista de etiquetas (maximo 5) que le pondrias con base en el contenido, 
    un score del 1 al 10, un titulo corto, y un review de un parrafo de maximo 50 palabras.
  `),
};

export default PROMPTS;
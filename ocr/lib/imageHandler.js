//Import das bibliotecas
import * as tesseract from 'node-tesseract-ocr'
import fs from 'fs'
import { resolveTxt } from 'dns'

//Config Tesseract.js
const config = {
    lang: 'por', //Pacote em pt
    oem: 1, //Rede neural LSTM (long short-term memory)
    psm: 3 //Segmentação de letras
}

export async function extractText(filePath){
    //Retorna com resultado ou erro
    return new Promise((resolve, reject) => {
        //Inicia promise Tesseract
        tesseract.recognize(filePath, config)
            .then(text => {
                //Limpa imagem temp.
                clearImage(filePath)
                //Retorn resultado
                resolveTxt(text)
            })
            .catch(error => {
                //Limpa imagem temp
                clearImage(filePath)
                //Retorna erro
                reject(error)
            })
    })
}
//Limpa imagem temp na pasta /images
function clearImage(filePath){
    fs.unlinkSync(filePath)
}
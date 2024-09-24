import { Media } from './Media';

export class Filme implements Media {
    titulo: string;
    ano: number;
    genero: string;
    descricao: string;
    avaliacao: number;
    duracao: string; 
    
    constructor(
      titulo: string,
      ano: number,
      genero: string,
      descricao: string,
      avaliacao: number,
      duracao: string
    ) {
      this.titulo = titulo;
      this.ano = ano;
      this.genero = genero;
      this.descricao = descricao;
      this.avaliacao = avaliacao;
      this.duracao = duracao;
    }
  }
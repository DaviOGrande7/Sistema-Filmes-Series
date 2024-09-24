"use client";
import { useState } from 'react';
import { Filme } from './classes/Filme';
import { Serie } from './classes/Serie';
import CardDescricao from './components/CardDescricao';
import {
  handleAdd,
  handleCancel,
  handleDelete,
  handleEdit,
  handleRate,
  handleSave
} from './functions';

export default function Home() {
  const [tipo, setTipo] = useState<string>('');
  const [titulo, setTitulo] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [ano, setAno] = useState<string>('');
  const [genero, setGenero] = useState<string>('');
  const [duracao, setDuracao] = useState<string>('');
  const [temporadas, setTemporadas] = useState<string>('');
  const [editingMedia, setEditingMedia] = useState<Filme | Serie | null>(null);

  const [medias, setMedias] = useState<(Filme | Serie)[]>([
    new Filme(
      "Interestelar",
      2014,
      "Ficção científica/Aventura",
      "As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie.",
      2,
      "2h 49min"
    ),
    new Serie(
      "Mr. Robot",
      2015,
      "Drama",
      "Elliot é um jovem programador que trabalha como engenheiro de segurança virtual durante o dia, e como hacker vigilante durante a noite. Elliot se vê em uma encruzilhada quando é recrutado para destruir a firma que ele é pago para proteger.",
      1,
      4
    )
  ]);

  const clearForm = () => {
    setTitulo('');
    setDescricao('');
    setAno('');
    setGenero('');
    setDuracao('');
    setTemporadas('');
    setTipo('');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-1/2">
        <label className="block mb-2">
          Título
          <input
            type="text"
            id="titulo"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>
        
        <label className="block mb-2">
          Descrição
          <textarea
            id="descricao"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={3}
          />
        </label>
        
        <fieldset className="mb-4">
          <legend className="block mb-2 font-semibold">Tipo</legend>
          <div className="flex items-center">
            <input
              type="radio"
              id="filmes"
              name="tipo"
              value="filmes"
              className="mr-2"
              checked={tipo === 'filmes'}
              onChange={() => setTipo('filmes')}
            />
            <label htmlFor="filmes" className="mr-4">Filmes</label>
            <input
              type="radio"
              id="series"
              name="tipo"
              value="series"
              className="mr-2"
              checked={tipo === 'series'}
              onChange={() => setTipo('series')}
            />
            <label htmlFor="series">Séries</label>
          </div>
        </fieldset>
        
        <label className="block mb-2">
          Ano
          <input
            type="text"
            id="ano"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          />
        </label>
        
        <label className="block mb-2">
          Gênero
          <input
            type="text"
            id="genero"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
        </label>
        
        <label className="block mb-2">
          Duração
          <input
            type="text"
            id="duracao"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
            disabled={tipo === 'series'}
          />
        </label>
        
        <label className="block mb-2">
          Temporadas
          <input
            type="text"
            id="temporadas"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={temporadas}
            onChange={(e) => setTemporadas(e.target.value)}
            disabled={tipo === 'filmes'}
          />
        </label>
        
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition mr-3"
            onClick={() => handleAdd(tipo, titulo, ano, genero, descricao, duracao, temporadas, setMedias)}
            disabled={!titulo || !ano || !genero || (tipo === 'filmes' ? !duracao : !temporadas)} // Validação simples
          >
            Adicionar
          </button>
          <button
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition mr-3"
            onClick={() => handleSave(
              editingMedia,
              titulo,
              ano,
              genero,
              descricao,
              duracao,
              temporadas,
              setMedias,
              clearForm
            )}
            disabled={!editingMedia}
          >
            Salvar
          </button>
          <button
            className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 hover:bg-gray-400 transition"
            onClick={() => handleCancel(clearForm, setEditingMedia)}
          >
            Cancelar
          </button>
        </div>
      </div>

      <div className="w-1/2 bg-gray-50">    
        {medias.map((media, index) => (
          <CardDescricao 
          key={index} 
          media={media} 
          onEdit={() => handleEdit(media, setEditingMedia, setTitulo, setDescricao, setAno, setGenero, setDuracao, setTemporadas, setTipo)}
          onDelete={() => handleDelete(media, setMedias)}
          onRate={(newRating) => handleRate(media, newRating, setMedias)}
          />
        ))}
      </div>
    </div>
  );
}

import { Filme } from './classes/Filme';
import { Serie } from './classes/Serie';

type MediaType = Filme | Serie;

/**
 * Remove uma mídia da lista de mídias.
 */
export const handleDelete = (mediaToDelete: MediaType, setMedias: React.Dispatch<React.SetStateAction<MediaType[]>>) => {
  setMedias((prevMedias) => prevMedias.filter(media => media !== mediaToDelete));
};

/**
 * Atualiza a avaliação de uma mídia.
 */
export const handleRate = (
  mediaToRate: MediaType,
  newRating: number,
  setMedias: React.Dispatch<React.SetStateAction<MediaType[]>>
) => {
  setMedias((prevMedias) =>
    prevMedias.map((media) =>
      media === mediaToRate ? { ...media, avaliacao: newRating } : media
    )
  );
};

/**
 * Configura os dados para edição de uma mídia.
 */
export const handleEdit = (
  media: MediaType,
  setEditingMedia: React.Dispatch<React.SetStateAction<MediaType | null>>,
  setTitulo: React.Dispatch<React.SetStateAction<string>>,
  setDescricao: React.Dispatch<React.SetStateAction<string>>,
  setAno: React.Dispatch<React.SetStateAction<string>>,
  setGenero: React.Dispatch<React.SetStateAction<string>>,
  setDuracao: React.Dispatch<React.SetStateAction<string>>,
  setTemporadas: React.Dispatch<React.SetStateAction<string>>,
  setTipo: React.Dispatch<React.SetStateAction<string>>,
) => {
  setEditingMedia(media);
  setTitulo(media.titulo);
  setDescricao(media.descricao);
  setAno(media.ano.toString());
  setGenero(media.genero);

  if (media instanceof Filme) {
    setTipo('filmes');
    setDuracao(media.duracao);
    setTemporadas('');
  } else if (media instanceof Serie) {
    setTipo('series');
    setTemporadas(media.temporadas.toString());
    setDuracao('');
  }
};

/**
 * Salva as alterações feitas em uma mídia.
 */
export const handleSave = (
  editingMedia: MediaType | null,
  titulo: string,
  ano: string,
  genero: string,
  descricao: string,
  duracao: string,
  temporadas: string,
  setMedias: React.Dispatch<React.SetStateAction<MediaType[]>>,
  clearForm: () => void
) => {
  if (editingMedia) {
    let updatedMedia: MediaType;

    if (editingMedia instanceof Filme) {
      updatedMedia = new Filme(
        titulo,
        Number(ano),
        genero,
        descricao,
        editingMedia.avaliacao,
        duracao
      );
    } else if (editingMedia instanceof Serie) {
      updatedMedia = new Serie(
        titulo,
        Number(ano),
        genero,
        descricao,
        editingMedia.avaliacao,
        Number(temporadas)
      );
    } else {
      return; 
    }

    setMedias((prevMedias) =>
      prevMedias.map((media) =>
        media === editingMedia ? updatedMedia : media
      )
    );

    clearForm();
  }
};

/**
 * Adiciona uma nova mídia à lista.
 */
export const handleAdd = (
    tipo: string,
    titulo: string,
    ano: string,
    genero: string,
    descricao: string,
    duracao: string,
    temporadas: string,
    setMedias: React.Dispatch<React.SetStateAction<MediaType[]>>
  ) => {
    let newMedia: MediaType;
  
    if (tipo === 'filmes') {
      newMedia = new Filme(
        titulo,
        Number(ano),
        genero,
        descricao,
        0, // Avaliação inicial
        duracao
      );
    } else if (tipo === 'series') {
      newMedia = new Serie(
        titulo,
        Number(ano),
        genero,
        descricao,
        0, // Avaliação inicial
        Number(temporadas)
      );
    } else {
      return; 
    }
  
    setMedias((prevMedias) => [...prevMedias, newMedia]);
  };

/**
 * Cancela a edição de uma mídia.
 */
export const handleCancel = (
  clearForm: () => void,
  setEditingMedia: React.Dispatch<React.SetStateAction<MediaType | null>>
) => {
  clearForm();
  setEditingMedia(null);
};

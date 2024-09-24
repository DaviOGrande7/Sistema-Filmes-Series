import { Filme } from '../classes/Filme';  
import { Serie } from '../classes/Serie';  

type MediaType = Filme | Serie;

interface CardDescricaoProps {
  media: MediaType; 
  onEdit: () => void;
  onDelete: () => void;
  onRate: (newRating: number) => void; 
}

export default function CardDescricao({ media, onEdit, onDelete, onRate }: CardDescricaoProps) {
  const isFilme = (media: MediaType): media is Filme => {
    return (media as Filme).duracao !== undefined;
  };

  const renderStars = (avaliacao: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          onClick={() => onRate(i)} 
          style={{ cursor: 'pointer', color: i <= avaliacao ? 'gold' : 'gray' }}
        >
          {i <= avaliacao ? '⭐' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="border rounded-lg p-4 shadow-md mb-4">
      <h2 className="text-sm text-gray-500">
        {isFilme(media) ? "Filme" : "Série"}
      </h2>

      <h2 className="text-xl font-bold">{media.titulo}</h2>
      <p className="text-sm font-bold">
        {media.ano} - {media.genero}
        {isFilme(media) ? ` - ${media.duracao}` : ` - ${media.temporadas} temporadas`}
      </p>
      <p className="mt-2">{media.descricao}</p>

      <div className="flex justify-start mt-3">
        <button 
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition mr-3"
          onClick={onEdit}
        >
          Editar
        </button>
        <button 
          className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 transition"
          onClick={onDelete}
        >
          Excluir
        </button>
      </div>

      <div className="flex justify-start items-center mt-3">
        {renderStars(media.avaliacao)} 
      </div>
    </div>
  );
}

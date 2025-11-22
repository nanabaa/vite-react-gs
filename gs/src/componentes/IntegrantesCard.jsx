import iconGit from '../img/image 2.png';
import iconLinkedin from '../img/image 3.png';

const IntegranteCard = ({ 
  foto, 
  nome, 
  turma = '1TDSR', 
  rm, 
  git,
  linkedin
}) => {
  return (
    <>
    <div className='flex flex-col justify-center rounded-2xl items-center w-[333px] h-[493px] shadow-xl'>
      <img 
        src={foto} 
        className='pb-5' 
        alt={"Foto Integrante"} 
      />
      <h4 className='font-bold text-2xl text-azulclaro text-center'>{nome}</h4>
      <p className='text-xl text-azul'>{turma} - RM{rm}</p>
      <div className='flex pt-5 w-full justify-evenly'>
          <a href={git}>
            <img src={iconGit}  alt="GitHub" />
          </a>
          <a href={linkedin}>
            <img src={iconLinkedin} alt="LinkedIn" />
</a>
      </div>
    </div>
    </>
  );
};

export default IntegranteCard;

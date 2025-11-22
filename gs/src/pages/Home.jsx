import backgroundImage from '../img/banner.jpg';
import Linha1 from '../img/Group 23.png';
import Linha2 from '../img/Group 22.png';
import Icon1 from '../img/Profile-Lightbulb.png';
import Icon2 from '../img/Group-1.png';
import Ellipse from '../img/Ellipse 1.png';


function Home() {
    return (
        <>
            <section className=" h-[53.5rem] flex justify-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: '50%',
                    backgroundRepeat: 'no-repeat'
                }}>
                <div className="flex flex-col justify-center items-center text-center gap-5 animate-title max-w-[400px] sm:max-w-5xl ">
                    <h1 className="text-4xl md:text-6xl font-bold text-text-white ">ACIR Systems</h1>
                    <h4 className="text-3xl text-center md:text-4xl sm:max-w-xl text-text-white ">Soluções em software</h4>
                </div>
            </section>

            <section className='min-h-screen bg-text-text-white flex flex-col justify-center items-center gap-50 flex-wrap'>
                
                <div className='flex justify-center md:flex-none flex-row gap-35 md:gap-50 flex-wrap'>
                    <div className='max-w-[380px] md:max-w-[480px] min-h-[144px]  flex flex-row items-center text-text'>
                        <img src={Icon1} className='w-15 h-15 mr-5' alt="Icone Missão" />
                        <div className='flex flex-col text-justify gap-2'>
                            <h4 className='font-bold text-2xl sm:text-4xl '>Por que?</h4>
                            <p className='text-xl sm:text-2xl'>Num futuro cada vez mais moldado pela inteligência artificial, enxergamos a necessidade de inovar, desafiar e redesenhar a forma como vivemos e lidamos com as situações.
                            </p>
                        </div>
                    </div>
                    <div className='max-w-[380px] md:max-w-[480px] min-h-[144px] flex flex-row items-center text-text'>
                        <img src={Icon2} className='w-15 h-15 mr-5' alt="Icone Para Quem" />
                        <div className='flex flex-col text-justify gap-2'>
                            <h4 className='font-bold text-2xl sm:text-4xl'>Para quem?</h4>
                            <p className='text-xl sm:text-2xl' >Empresas, recrutadores, consultores e trabalhadores no geral. Quaisquer pessoas que precisarem de planejamento de equipe para projetos profissionais poderão se beneficiar da solução.
                            </p>
                        </div>
                    </div>
                </div>
               
            </section>





           

        </>
    );
}

export default Home;

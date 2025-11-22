import backgroundImage2 from '../img/banner2.jpg';

function Solucoes() {
    return (
        <>
            <section className=" h-[53.5rem] flex justify-start items-center"
                style={{
                    backgroundImage: `url(${backgroundImage2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}>

                <h1 className="text-4xl md:text-6xl font-bold text-text w-xl pl-25 animate-title">Entenda mais sobre nosso projeto</h1>
            </section>

            <section className='min-h-screen bg-text-white flex flex-col content-center text-justify flex-wrap lg:p-25 gap-10 '>
                   
                    
                    <div className='flex flex-row justify-center md:justify-between mt-20 items-center w-sm sm:w-lg  md:w-2xl lg:w-5xl xl:w-auto flex-wrap xl:flex-nowrap '>
                        <div className=' flex flex-col gap-10 w-6xl'>
                <h4 className='text-3xl lg:text-6xl  font-bold text-text'>Nossa solução</h4>
                <p className='text-xl lg:text-2xl leading-13'>Num futuro cada vez mais moldado pela inteligência artificial, identificamos uma oportunidade única para transformar como as equipes de trabalho são formadas. O problema central reside na abordagem tradicional das empresas, que frequentemente priorizam apenas as habilidades técnicas na formação de equipes, negligenciando a complexa dinâmica humana essencial para o sucesso sustentável. Essa lacuna gera conflitos internos, rotatividade desnecessária em projetos e uma produtividade abaixo do potencial, mesmo quando se conta com talentos individualmente excelentes, resultando em desgaste emocional e perda de eficiência.</p>

                <p className='text-xl lg:text-2xl leading-13'>Nossa proposta é uma plataforma que utiliza a inteligência artificial para criar um método mais inteligente e humano de formar equipes. No site, cada profissional cadastra informações sobre suas habilidades, experiências, gostos relacionados ao trabalho e seu estilo de trabalho. A IA, por sua vez, analisa esses dados para encontrar a melhor compatibilidade entre os membros, sugerindo combinações que prometem não apenas maior produtividade, mas também um ambiente mais agradável e coeso.</p>

                <p className='text-xl lg:text-2xl leading-13'>O diferencial competitivo desta solução está na sua natureza proativa. Diferente de ferramentas que apenas analisam equipes já existentes, nossa plataforma é focada em prevenir problemas ao formar a equipe ideal desde o início. O algoritmo pondera um conjunto completo de fatores, desde competências técnicas até preferências pessoais e estilos de comunicação, com o objetivo de criar sinergia genuína. O sucesso é medido não apenas por prazos e metas, mas também pela satisfação da equipe e pelo bem-estar dos profissionais.</p>

                 <p className='text-xl lg:text-2xl leading-13'>O público-alvo inicial inclui empresas de tecnologia, consultorias e startups, segmentos onde a formação de equipes dinâmicas e a colaboração eficaz são críticas para o sucesso. Para essas organizações, o impacto esperado é significativo: um aumento na eficiência dos projetos e uma redução na rotatividade interna. Para os profissionais, a promessa é de ambientes de trabalho mais gratificantes e um desenvolvimento acelerado por meio de parcerias verdadeiramente complementares.</p>
                 
                
                        </div>
                        
                    </div>
                    <div>
            <a className="bg-roxo w-100 pt-2 pb-2 pl-10 pr-10 h-50 text-2xl rounded-3xl mt-15 text-text-white cursor-pointer" type="submit" name="submit" id="submit" href="/gerador">Acessar Gerador de Equipes</a>
          </div>
            </section>
        </>
    );
}
export default Solucoes
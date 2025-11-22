import IntegranteCard from '../componentes/IntegrantesCard';
import Foto1 from '../img/Ellipse 3.png';
import Foto2 from '../img/Ellipse 2.png';
import Foto3 from '../img/Ellipse 4.png';



function Integrantes() {
  return (
    <>
      <section className=" h-full sm:h-screen flex flex-col justify-center items-center mb-25 sm:mb-0">
        <h2 className="text-3xl my-25 sm:mt-100 mb-20 md:mt-0">Conheça Nossa Equipe</h2>
        <div className='flex flex-col md:flex-row gap-20'>

          <IntegranteCard
            foto={Foto2}
            nome="Isis Macedo"
            rm="561497"
            git="https://github.com/isismodd"
            linkedin="https://www.linkedin.com/in/isis-macedo-aa515920b/"
          />

          <IntegranteCard
            foto={Foto1}
            nome="Ana Clara Oliveira"
            rm="561957"
            git="https://github.com/nanabaa"
            linkedin="https://www.linkedin.com/in/anaclaraolinasc"
          />

          <IntegranteCard
            foto={Foto3}
            nome="Rafael Carvalho"
            rm="563413"
            git="http://github.com/rafaelcmeireles"
            linkedin="https://www.linkedin.com/in/rafael-carvalho-meireles-0a3a87130/"
          />

        </div>
      </section>

    </>
  )

}

export default Integrantes

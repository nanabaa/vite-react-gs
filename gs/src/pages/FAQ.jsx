function FAQ() {
  return (
    <>
      <section className=" h-[53.5rem] flex flex-col justify-center items-center">
        <h1 className="text-3xl text-text ">Dúvidas Frequentes</h1>
        <div className="lg:ml-50 self-start mt-30 flex flex-col  text-text !justify-self-start !items-start gap-10">
            <div className="p-4 cursor-pointer">
              <h1 className="text-2xl lg:text-3xl font-semibold">
                Qual o público alvo do aplicativo?
              </h1>
              <h4  className="text-xl lg:text-2xl text-text/65">
                Empresas, recrutadores, consultores e trabalhadores no geral. Quaisquer pessoas que precisarem de planejamento de equipe para projetos profissionais poderão se beneficiar da solução.
              </h4>
            </div>
            <div className="p-4 cursor-pointer">
              <h1 className="text-2xl lg:text-3xl font-semibold">
              Qual a função dessa solução?
              </h1>
              <h4  className="text-xl lg:text-2xl  text-text/65">
                O site propõe criar uma sinergia genuína na equipe, analisando desde competências técnicas até preferências pessoais e estilos de comunicação.
              </h4>
            </div>
            <div className="p-4 cursor-pointer">
              <h1 className="text-2xl lg:text-3xl font-semibold">
              Qual o diferencial da solução?
              </h1>
              <h4 className="text-xl lg:text-2xl  text-text/65">
                O diferencial competitivo desta solução está na sua natureza proativa. Diferente de ferramentas que apenas analisam equipes já existentes, nossa plataforma é focada em prevenir problemas ao formar a equipe ideal desde o início.
              </h4>
            </div>
            <div className="p-4 cursor-pointer">
              <h1 className="text-2xl lg:text-3xl font-semibold">
              Por que usar a solução?
              </h1>
              <h4 className="text-xl lg:text-2xl  text-text/65">
                Para garantir menor rotatividade de equipes e maior sinergia, que terá como consequência não somente um aumento na eficiência da equipe, mas também favorecerá o bem-estar dos trabalhadores.
              </h4>
            </div>
        </div>
      </section>

    </>
  )
  
}

export default FAQ
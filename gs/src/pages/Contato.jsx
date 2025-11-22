import { useState } from 'react';

function Contato() {
  const [telefone, setTelefone] = useState('');

  const formatoTelefone = (value) => {
    const numeros = value.replace(/\D/g, '').slice(0, 11);

    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length <= 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
  };

  const telefoneChange = (e) => {
    const numeros = e.target.value.replace(/\D/g, '').slice(0, 11);
    setTelefone(formatoTelefone(numeros));
  }

  const enviarForms = (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
  };

  return (
    <>
      <section className="h-[53.5rem] flex flex-col justify-center items-center">
        <h2 className="text-3xl mb-20 md:mt-0">Contate-nos</h2>

        <form className="flex flex-col items-center gap-5" name="forms" id="forms" method="get" onSubmit={enviarForms} action="">
          <div>
            <input className="w-sm sm:w-lg md:w-3xl h-[50px] border-00 outline-0 rounded-b-md border-b-5 border-lilas focus:border-roxo" type="text" name="nome" id="nome" placeholder="Nome" required />
          </div>
          <div>
            <input className="w-sm sm:w-lg md:w-3xl h-[50px] border-00 outline-0 rounded-b-md border-b-5 border-lilas focus:border-roxo" type="email" name="email" id="email" placeholder="E-mail" required />
          </div>
          <div>
            <input className="w-sm sm:w-lg md:w-3xl h-[50px] border-00 outline-0 rounded-b-md border-b-5 border-lilas focus:border-roxo" type="tel" name="telefone" id="telefone" placeholder="(00) 00000-0000" value={telefone} onChange={telefoneChange} required />
          </div>
          <div>
            <input className="w-sm sm:w-lg md:w-3xl h-[50px] border-00 outline-0 rounded-b-md border-b-5 border-lilas focus:border-roxo" type="text" name="mensagem" id="mensagem" placeholder="Insira sua mensagem" required />
          </div>
          <div>
            <button className="bg-roxo w-50 h-12 text-2xl rounded-3xl mt-15 text-text-white cursor-pointer" type="submit" name="submit" id="submit">Enviar</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Contato;
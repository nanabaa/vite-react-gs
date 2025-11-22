import { useState, useCallback } from "react";
import Input from "../componentes/input";
import Button from "../componentes/button";

// --- Configuração da API ---
const API_BASE_URL = 'https://java-gs-2.onrender.com';

// Interfaces mínimas para tipagem dos dados (mantidas como referência para o JSON de saída)
interface Colaborador {
    // ID removido daqui, pois será gerado pelo backend
    nome: string;
    idade: number;
    personalidade: string;
    experiencia: number;
    habilidades: string[];
}

// ----------------------------------------------------
// Mapeamentos para a API
// ----------------------------------------------------

// O seletor de Softskills (Personalidade) deve ser mapeado para o campo "personalidade" do JSON
const PERSONALIDADE_MAP: Record<string, string> = {
    "Comunicação": "Comunicador",
    "Liderança": "Líder",
    "Criatividade": "Criativo",
    "Trabalho em equipe": "Colaborativo",
    "Pensamento crítico": "Analítico",
    "Resolução de problemas": "Solucionador",
    "Adaptabilidade": "Adaptável",
    "Inteligência emocional": "Empático",
    "Proatividade": "Proativo",
    "": ""
};

// O seletor de Experiência deve ser mapeado para o campo "experiencia" (number) do JSON
const EXPERIENCIA_MAP: Record<string, number> = {
    "Menos de um ano": 0,
    "1 ano": 1,
    "2 a 5 anos": 3,
    "6 a 10 anos": 8,
    "Mais de 10 anos": 12, // Usando um valor alto como 12 (anos)
    "": 0
};

function Cadastro() {
    // 1. ESTADOS
    // A variável searchColaborador (ID/CPF) foi removida
    const [nomeColaborador, setNomeColaborador] = useState('');
    const [idadeColaborador, setIdadeColaborador] = useState('');
    
    // Status de Loading
    const [loadingCadastro, setLoadingCadastro] = useState(false);
    
    // Estados para os selects
    const [personalidadeSelecionada, setPersonalidadeSelecionada] = useState('');
    const [experienciaSelecionada, setExperienciaSelecionada] = useState('');
    const [habilidades, setHabilidades] = useState(['', '', '', '', '']);


    // 2. FUNÇÕES DE CHAMADA DE API

    // Função para Cadastrar um novo colaborador (POST /colaboradores)
    const handleCadastrarColaborador = useCallback(async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();

        const nome = nomeColaborador.trim();
        const idade = parseInt(idadeColaborador);
        
        // 1. Validação mínima dos campos obrigatórios
        if (!nome || !idade || isNaN(idade) || !personalidadeSelecionada || !experienciaSelecionada) {
            alert("Por favor, preencha Nome, Idade, Personalidade e Experiência Mínima.");
            return;
        }

        // 2. Mapeamento dos dados do formulário para o JSON da API
        const habilidadesLimpa = habilidades.filter(h => h).map(h => h.trim());
        const experienciaMapeada = EXPERIENCIA_MAP[experienciaSelecionada] || 0;
        const personalidadeMapeada = PERSONALIDADE_MAP[personalidadeSelecionada] || "Neutro";

        // JSON de envio (sem o campo 'id')
        const colaboradorData: Omit<Colaborador, 'id'> = {
            nome: nome,
            idade: idade,
            personalidade: personalidadeMapeada,
            experiencia: experienciaMapeada,
            habilidades: habilidadesLimpa
        };

        console.log("JSON a ser enviado:", colaboradorData);

        setLoadingCadastro(true);

        try {
            const response = await fetch(`${API_BASE_URL}/colaboradores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(colaboradorData),
            });

            if (response.ok || response.status === 201) { // 201 Created é o esperado para POST
                const resultado = await response.json();
                alert(`✅ Colaborador '${colaboradorData.nome}' cadastrado com sucesso! ID gerado: ${resultado.id || 'N/A'}`);
                console.log("Resultado do Cadastro:", resultado);
                
                // Limpar formulário após sucesso
                setNomeColaborador('');
                setIdadeColaborador('');
                setPersonalidadeSelecionada('');
                setExperienciaSelecionada('');
                setHabilidades(['', '', '', '', '']);

            } else {
                const erro = await response.text();
                throw new Error(`Erro na API ao cadastrar colaborador: ${response.status} - ${erro}`);
            }

        } catch (error) {
            console.error("Erro ao cadastrar o colaborador:", error);
            alert("❌ Ocorreu um erro de rede ou API ao cadastrar o colaborador. Verifique o console.");
        } finally {
            setLoadingCadastro(false);
        }
    }, [nomeColaborador, idadeColaborador, personalidadeSelecionada, experienciaSelecionada, habilidades]);
    
    // Função utilitária para manipular os selects de Habilidades (múltiplas)
    const handleHabilidadeChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const newArray = [...habilidades];
        newArray[index] = e.target.value;
        setHabilidades(newArray);
    };


    return (
        <>
            <section className="h-[53.5rem] flex flex-col justify-center items-center  mb-20">
                <h2 className="text-3xl mb-10 md:mt-20">Cadastro de Colaborador</h2>
                <div className="flex flex-col w-full max-w-4xl px-4">
                    
                    {/* Formulário Principal */}
                    <form className="p-6 border rounded-lg shadow-md bg-white">
                        
                        {/* Campos de Nome e Idade */}
                        <div className="flex justify-between mb-6 space-x-4">
                            <Input
                                label="Nome"
                                name="nomeColaborador"
                                placeholder="Nome Completo do Colaborador"
                                value={nomeColaborador}
                                handleChange={setNomeColaborador}
                                className="flex-1"
                            />
                            <Input
                                label="Idade"
                                name="idadeColaborador"
                                placeholder="Idade"
                                value={idadeColaborador}
                                type="number"
                                handleChange={setIdadeColaborador}
                                className="w-1/4"
                            />
                        </div>
                        
                        {/* Seletor de Personalidade (Softskill) */}
                        <div className="mb-6">
                            <div className="flex flex-col justify-self-start">
                                <label className='text-xl lg:text-2xl leading-13 mb-2' htmlFor="personalidade">Personalidade / Softskill Principal</label>
                                <select 
                                    id="personalidade"
                                    value={personalidadeSelecionada}
                                    onChange={(e) => setPersonalidadeSelecionada(e.target.value)}
                                    className="p-2 border rounded border-neutral-900"
                                >
                                    <option value="">Selecione a Personalidade</option>
                                    {Object.keys(PERSONALIDADE_MAP).filter(key => key !== "").map(key => (
                                        <option key={key} value={key}>{key}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Seletor de Experiência */}
                        <div className="mb-6">
                            <div className="flex flex-col justify-self-start">
                                <label className='text-xl lg:text-2xl leading-13 mb-2' htmlFor="experiencia">Nível de Experiência</label>
                                <select 
                                    id="experiencia"
                                    value={experienciaSelecionada}
                                    onChange={(e) => setExperienciaSelecionada(e.target.value)}
                                    className="p-2 border rounded border-neutral-900"
                                >
                                    <option value="">Selecione o Nível de Experiência</option>
                                    {Object.keys(EXPERIENCIA_MAP).filter(key => key !== "").map(key => (
                                        <option key={key} value={key}>{key}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        {/* Campos de Habilidades */}
                        <h2 className='text-xl lg:text-2xl leading-13 mt-6 mb-4'>Habilidades Técnicas (Hard Skills)</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Habilidades */}
                            <div className="flex flex-col col-span-3">
                                <label htmlFor="">Principais Habilidades</label>
                                {habilidades.map((value, index) => (
                                    <select 
                                        key={`habilidade-${index}`}
                                        className="p-2 border rounded mb-2"
                                        value={value}
                                        onChange={(e) => handleHabilidadeChange(e, index)}
                                    >
                                        <option value="">Selecione a Habilidade {index + 1}</option>
                                        <option value="Back-end">Back-end</option>
                                        <option value="Front-end">Front-end</option>
                                        <option value="Design">Design</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Administração">Administração</option>
                                        <option value="Redes">Redes</option>
                                        <option value="Dados">Dados</option>
                                        <option value="Modelagem 3D">Modelagem 3D</option>
                                        <option value="Audiovisual">Audiovisual</option>
                                    </select>
                                ))}
                            </div>
                        </div>

                        {/* Botão de Cadastrar Colaborador */}
                        <div className="flex justify-center mt-12">
                            <Button
                                type="button" 
                                handleClick={handleCadastrarColaborador}
                                disabled={loadingCadastro} 
                                className="w-auto bg-green-600 hover:bg-green-800" 
                            >
                                {loadingCadastro ? "Cadastrando..." : "Cadastrar Colaborador (POST)"}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Cadastro;
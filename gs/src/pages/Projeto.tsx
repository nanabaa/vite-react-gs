import { useState, useCallback } from "react";
import Input from "../componentes/input";
import Button from "../componentes/button";

// --- Configuração da API ---
const API_BASE_URL = 'https://java-gs-2.onrender.com';

// ----------------------------------------------------
// Interfaces e Mapeamentos para Projetos
// ----------------------------------------------------

/**
 * Interface do Projeto (sem o ID, que é gerado automaticamente)
 */
interface ProjetoData {
    nome: string;
    descricao: string;
    complexidade: number;
    minMembros: number;
    skillPrincipalRequerida: string;
    quantidadeIdeal: number;
    personalidadeDesejada: string;
    requisitos: string[];
}

// Mapeamento das Softskills (Personalidade Desejada)
const PERSONALIDADE_MAP: Record<string, string> = {
    "Comunicador": "Comunicador",
    "Líder": "Líder",
    "Criativo": "Criativo",
    "Colaborativo": "Colaborativo",
    "Analítico": "Analítico",
    "Solucionador": "Solucionador",
    "Adaptável": "Adaptável",
    "Empático": "Empático",
    "Proativo": "Proativo",
    "": ""
};

// Opções de Hard Skills (Requisitos)
const HARD_SKILL_OPTIONS = [
    "Back-end", "Front-end", "Design", "Marketing", "Administração", 
    "Redes", "Dados", "Modelagem 3D", "Audiovisual", "Java", "Banco de Dados"
];

function Projeto() {
    // 1. ESTADOS
    const [nomeProjeto, setNomeProjeto] = useState('');
    const [descricaoProjeto, setDescricaoProjeto] = useState('');
    
    // Estados numéricos
    const [complexidade, setComplexidade] = useState(''); // 0 a 10
    const [minMembros, setMinMembros] = useState('');
    const [quantidadeIdeal, setQuantidadeIdeal] = useState('');
    
    // Estados para os selects/multi-selects
    const [personalidadeDesejada, setPersonalidadeDesejada] = useState('');
    const [skillPrincipalRequerida, setSkillPrincipalRequerida] = useState('');
    const [requisitos, setRequisitos] = useState(['', '', '', '', '']); // 5 campos de requisitos
    
    // Status de Loading
    const [loadingCadastro, setLoadingCadastro] = useState(false);
    

    // 2. FUNÇÕES DE CHAMADA DE API

    // Função para Cadastrar um novo projeto (POST /projetos)
    const handleCadastrarProjeto = useCallback(async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();

        const nome = nomeProjeto.trim();
        const complexidadeNum = parseInt(complexidade);
        const minMembrosNum = parseInt(minMembros);
        const quantidadeIdealNum = parseInt(quantidadeIdeal);
        
        // 1. Validação mínima dos campos obrigatórios
        if (!nome || !descricaoProjeto || isNaN(complexidadeNum) || !minMembrosNum || !quantidadeIdealNum || !personalidadeDesejada || !skillPrincipalRequerida) {
            alert("Por favor, preencha Nome, Descrição, Complexidade, Membros Mínimos/Ideais, Personalidade e Skill Principal.");
            return;
        }

        // 2. Mapeamento dos dados do formulário para o JSON da API
        const requisitosLimpos = requisitos.filter(r => r).map(r => r.trim());

        // JSON de envio (sem o campo 'id')
        const projetoData: ProjetoData = {
            nome: nome,
            descricao: descricaoProjeto,
            complexidade: complexidadeNum,
            minMembros: minMembrosNum,
            quantidadeIdeal: quantidadeIdealNum,
            personalidadeDesejada: PERSONALIDADE_MAP[personalidadeDesejada] || "Neutro",
            skillPrincipalRequerida: skillPrincipalRequerida,
            requisitos: requisitosLimpos 
        };

        console.log("JSON a ser enviado:", projetoData);

        setLoadingCadastro(true);

        try {
            // MUDANÇA DE ENDPOINT: /colaboradores -> /projetos
            const response = await fetch(`${API_BASE_URL}/projetos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projetoData),
            });

            if (response.ok || response.status === 201) { // 201 Created é o esperado para POST
                const resultado = await response.json();
                alert(`✅ Projeto '${projetoData.nome}' cadastrado com sucesso! ID gerado: ${resultado.id || 'N/A'}`);
                
                // Limpar formulário após sucesso
                setNomeProjeto('');
                setDescricaoProjeto('');
                setComplexidade('');
                setMinMembros('');
                setQuantidadeIdeal('');
                setPersonalidadeDesejada('');
                setSkillPrincipalRequerida('');
                setRequisitos(['', '', '', '', '']);

            } else {
                const erro = await response.text();
                throw new Error(`Erro na API ao cadastrar projeto: ${response.status} - ${erro}`);
            }

        } catch (error) {
            console.error("Erro ao cadastrar o projeto:", error);
            alert("❌ Ocorreu um erro de rede ou API ao cadastrar o projeto. Verifique o console.");
        } finally {
            setLoadingCadastro(false);
        }
    }, [nomeProjeto, descricaoProjeto, complexidade, minMembros, quantidadeIdeal, personalidadeDesejada, skillPrincipalRequerida, requisitos]);
    
    // Função utilitária para manipular os selects de Requisitos (múltiplas hard skills)
    const handleRequisitoChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const newArray = [...requisitos];
        newArray[index] = e.target.value;
        setRequisitos(newArray);
    };


    return (
        <>
            <section className="min-h-screen flex flex-col items-center py-10">
                <h2 className="text-3xl mb-10">Cadastro de Projeto 💡</h2>
                <div className="flex flex-col w-full max-w-4xl px-4">
                    
                    {/* Formulário Principal */}
                    <form className="p-6 border rounded-lg shadow-md bg-white">
                        
                        {/* Campos de Nome e Descrição */}
                        <div className="mb-6">
                            <Input
                                label="Nome do Projeto"
                                name="nomeProjeto"
                                placeholder="Nome Curto e Descritivo"
                                value={nomeProjeto}
                                handleChange={setNomeProjeto}
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                label="Descrição"
                                name="descricaoProjeto"
                                placeholder="Detalhes do projeto, tecnologias, etc."
                                value={descricaoProjeto}
                                handleChange={setDescricaoProjeto}
                            />
                        </div>
                        
                        {/* Complexidade e Membros */}
                        <div className="flex justify-between mb-6 space-x-4">
                            <Input
                                label="Complexidade (0-10)"
                                name="complexidade"
                                placeholder="Ex: 5"
                                value={complexidade}
                                type="number"
                                handleChange={setComplexidade}
                                className="w-1/3"
                            />
                            <Input
                                label="Membros Mínimos"
                                name="minMembros"
                                placeholder="Mínimo necessário"
                                value={minMembros}
                                type="number"
                                handleChange={setMinMembros}
                                className="w-1/3"
                            />
                            <Input
                                label="Quantidade Ideal"
                                name="quantidadeIdeal"
                                placeholder="Ideal para o prazo"
                                value={quantidadeIdeal}
                                type="number"
                                handleChange={setQuantidadeIdeal}
                                className="w-1/3"
                            />
                        </div>
                        
                        {/* Skill Principal e Personalidade Desejada */}
                        <div className="flex justify-between mb-6 space-x-4">
                            {/* Skill Principal Requerida */}
                            <div className="flex flex-col w-1/2">
                                <label className='text-xl lg:text-2xl leading-13 mb-2' htmlFor="skillPrincipal">Skill Principal(Hard Skill)</label>
                                <select 
                                    id="skillPrincipal"
                                    value={skillPrincipalRequerida}
                                    onChange={(e) => setSkillPrincipalRequerida(e.target.value)}
                                    className="p-2 border rounded border-neutral-900"
                                >
                                    <option value="">Selecione a Skill Principal</option>
                                    {HARD_SKILL_OPTIONS.map(skill => (
                                        <option key={skill} value={skill}>{skill}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* Personalidade Desejada (Softskill) */}
                            <div className="flex flex-col w-1/2">
                                <label className='text-xl lg:text-2xl leading-13 mb-2' htmlFor="personalidade">Personalidade Desejada (Soft Skill)</label>
                                <select 
                                    id="personalidade"
                                    value={personalidadeDesejada}
                                    onChange={(e) => setPersonalidadeDesejada(e.target.value)}
                                    className="p-2 border rounded border-neutral-900"
                                >
                                    <option value="">Selecione a Personalidade</option>
                                    {Object.keys(PERSONALIDADE_MAP).filter(key => key !== "").map(key => (
                                        <option key={key} value={key}>{key}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Campos de Requisitos (Hard Skills Secundárias) */}
                        <h2 className='text-xl lg:text-2xl leading-13 mt-6 mb-4'>Requisitos/Skills Secundárias (Até 5)</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {requisitos.map((value, index) => (
                                <div key={`requisito-${index}`} className="flex flex-col col-span-1">
                                    <label htmlFor={`requisito-${index}`}>Requisito {index + 1}</label>
                                    <select 
                                        id={`requisito-${index}`}
                                        className="p-2 border rounded"
                                        value={value}
                                        onChange={(e) => handleRequisitoChange(e, index)}
                                    >
                                        <option value="">Selecione (Opcional)</option>
                                        {HARD_SKILL_OPTIONS.map(skill => (
                                            <option key={skill} value={skill}>{skill}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>

                        {/* Botão de Cadastrar Projeto */}
                        <div className="flex justify-center mt-12">
                            <Button
                                type="submit" 
                                handleClick={handleCadastrarProjeto}
                                disabled={loadingCadastro} 
                                className="w-auto bg-blue-600 hover:bg-blue-800" 
                            >
                                {loadingCadastro ? "Cadastrando..." : "Cadastrar Projeto (POST /projetos)"}
                            </Button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}

export default Projeto;
import { useState, useCallback } from "react";
import Input from "../componentes/input";
import Button from "../componentes/button";

// --- Configuração da API ---
const API_BASE_URL = 'https://java-gs-2.onrender.com';

// ----------------------------------------------------
// Interfaces COMPLETAS para tipagem dos dados
// ----------------------------------------------------

/**
 * Interface para Colaborador (Simplificada para exibição)
 */
interface Colaborador {
    id: string | number;
    nome: string;
    personalidade: string;
    habilidades: string[];
}

/**
 * Interface que representa a entidade Projeto.
 */
interface Projeto {
    id: string | number;
    nome: string;
    descricao: string;
    complexidade: number;
    minMembros: number;
    skillPrincipalRequerida: string;
    quantidadeIdeal: number;
    personalidadeDesejada: string;
    requisitos: string[]; 
}

/**
 * Interface que representa o resultado da formação da equipe.
 */
interface EquipeFormada {
    id: string | number;
    nome: string;
    projeto: Projeto;
    quantidadeMembros: number;
    integrantes: Colaborador[]; // Lista dos colaboradores selecionados
}


function Gerador() {
    // 1. ESTADOS
    const [searchProjeto, setSearchProjeto] = useState('');
    
    // Estado para o projeto buscado/selecionado
    const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(null);
    
    // NOVO ESTADO: Para armazenar e exibir a equipe formada
    const [equipeFormada, setEquipeFormada] = useState<EquipeFormada | null>(null);
    
    // Status de Loading
    const [loadingPesquisaProjeto, setLoadingPesquisaProjeto] = useState(false);
    const [loadingGerar, setLoadingGerar] = useState(false);


    // 2. FUNÇÕES DE CHAMADA DE API

    // Função para buscar um projeto pelo ID (GET /projetos/{id})
    const fetchProjeto = useCallback(async (id: string): Promise<Projeto | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/projetos/${id}`);

            if (response.ok) {
                const data = await response.json();
                return data as Projeto;
            } else if (response.status === 404) {
                return null; // Projeto não encontrado
            } else {
                throw new Error(`Erro na API ao buscar projeto: ${response.status}`);
            }
        } catch (error) {
            console.error("Erro ao fazer fetch do projeto:", error);
            throw error;
        }
    }, []);

    // Ação do botão: PESQUISAR PROJETO (busca e exibe os dados)
    const handlePesquisarProjeto = useCallback(async (e?: React.MouseEvent<HTMLButtonElement>) => {
        e?.preventDefault();
        const idParaPesquisar = searchProjeto.trim();
        
        if (!idParaPesquisar) {
            alert("Por favor, digite o ID do Projeto.");
            return;
        }

        setLoadingPesquisaProjeto(true); 
        setProjetoSelecionado(null); 
        setEquipeFormada(null); // Limpa equipe anterior

        try {
            const projeto = await fetchProjeto(idParaPesquisar);
            
            if (projeto) {
                setProjetoSelecionado(projeto);
                alert(`✅ Projeto '${projeto.nome}' (ID: ${projeto.id}) encontrado com sucesso!`);
            } else {
                alert(`⚠️ Erro: Projeto com ID '${idParaPesquisar}' não encontrado (404 Not Found).`);
            }
        } catch (error) {
            alert("❌ Ocorreu um erro de rede ou API ao buscar o projeto. Verifique o console.");
        } finally {
            setLoadingPesquisaProjeto(false);
        }

    }, [searchProjeto, fetchProjeto]);


    // Ação do botão "Gerar Equipe" (GET /equipes/formar/{idProjeto})
    const handleGerarEquipe = useCallback(async () => {
        
        if (!projetoSelecionado) {
             alert("⚠️ Por favor, primeiro PESQUISE um Projeto usando o ID para que os requisitos sejam carregados.");
             return;
        }

        const idProjetoParaGerar = projetoSelecionado.id;
        setEquipeFormada(null); // Limpa o resultado anterior antes de tentar gerar novamente
        setLoadingGerar(true);

        try {
            console.log(`Iniciando geração da equipe para o Projeto: ${projetoSelecionado.nome} (ID: ${idProjetoParaGerar})`);
            
            // Chama o endpoint de formação de equipe
            const response = await fetch(`${API_BASE_URL}/equipes/formar/${idProjetoParaGerar}`);
            
            if (response.ok) {
                const resultado = await response.json() as EquipeFormada;
                
                // SALVA O RESULTADO NO ESTADO
                setEquipeFormada(resultado); 
                
                alert(`✅ Equipe Gerada com Sucesso para o Projeto ${projetoSelecionado.nome}! Total de ${resultado.integrantes.length} membros.`);
                console.log("Resultado da Formação da Equipe:", resultado);

            } else if (response.status === 404) {
                 alert(`⚠️ Erro 404: A formação da equipe falhou. O projeto existe, mas colaboradores suficientes ou requisitos não foram atendidos. Verifique os dados da API.`);
            } else {
                const erro = await response.text();
                throw new Error(`Erro na API ao formar a equipe: ${response.status} - ${erro}`);
            }

        } catch (error) {
            alert("❌ Ocorreu um erro de rede ou API ao gerar a equipe. Verifique o console.");
        } finally {
            setLoadingGerar(false);
        }
    }, [projetoSelecionado]);
    

    // 3. RENDERIZAÇÃO
    return (
        <>
            <section className="min-h-screen flex flex-col items-center py-10">
                <h2 className="text-3xl mb-10 md:mt-0">Gerador de Equipes (Por Projeto)</h2>
                <div className="flex flex-col w-full max-w-4xl px-4">
                    
                    {/* Pesquisa de Projeto */}
                    <div className="flex space-x-4 mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
                        <Input
                            label="Pesquisar Projeto (ID)"
                            name="searchProjeto"
                            placeholder="Digite o ID do Projeto, ex: 1"
                            value={searchProjeto}
                            handleChange={setSearchProjeto}
                            className="flex-1"
                        />
                         <div className="self-end pb-1">
                            <Button
                                type="button" 
                                handleClick={handlePesquisarProjeto}
                                disabled={loadingPesquisaProjeto || !searchProjeto} 
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {loadingPesquisaProjeto ? "Buscando..." : "Pesquisar Projeto"}
                            </Button>
                        </div>
                    </div>
                    
                    {/* Detalhes e Requisitos do Projeto */}
                    <div className="p-6 border rounded-lg shadow-md bg-white mb-6">
                        <h3 className="text-xl font-bold mb-4">
                            {projetoSelecionado ? `Detalhes do Projeto: ${projetoSelecionado.nome}` : "Nenhum Projeto Selecionado"}
                        </h3>

                        {projetoSelecionado ? (
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                
                                {/* Coluna de Detalhes */}
                                <div>
                                    <p><strong>ID:</strong> {projetoSelecionado.id}</p>
                                    <p><strong>Descrição:</strong> {projetoSelecionado.descricao}</p>
                                    <p><strong>Complexidade:</strong> {projetoSelecionado.complexidade}</p>
                                </div>
                                
                                {/* Coluna de Requisitos para a Equipe */}
                                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded">
                                    <p><strong>👥 Mínimo de Membros:</strong> {projetoSelecionado.minMembros}</p>
                                    <p><strong>🎯 Quantidade Ideal:</strong> {projetoSelecionado.quantidadeIdeal}</p>
                                    <p><strong>🧠 Personalidade Desejada:</strong> {projetoSelecionado.personalidadeDesejada}</p>
                                    <p><strong>⭐ Skill Principal Requerida:</strong> {projetoSelecionado.skillPrincipalRequerida}</p>
                                    <p>
                                        <strong>📚 Requisitos (Skills Extras):</strong> 
                                        {projetoSelecionado.requisitos && projetoSelecionado.requisitos.length > 0
                                            ? projetoSelecionado.requisitos.join(', ')
                                            : 'Nenhum requisito extra definido.'
                                        }
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">Use a caixa de pesquisa acima para carregar os requisitos do projeto e gerar a equipe.</p>
                        )}

                        {/* Botão de Gerar Equipe */}
                        <div className="flex justify-center mt-12">
                            <Button
                                type="button" 
                                handleClick={handleGerarEquipe}
                                disabled={loadingGerar || !projetoSelecionado} // Depende de um projeto estar carregado
                                className="w-auto bg-green-600 hover:bg-green-800 text-lg" 
                            >
                                {loadingGerar ? "Gerando Equipe..." : "Gerar Equipe"}
                            </Button>
                        </div>
                    </div>
                    
                    {/* Seção de Exibição da Equipe Gerada */}
                    {equipeFormada && (
                        <div className="p-6 border-2 border-green-500 rounded-lg shadow-lg bg-green-50 mt-8">
                            <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
                                🏆 Equipe Gerada com Sucesso!
                            </h3>
                            <p className="mb-4 text-gray-700">
                                Total de **{equipeFormada.integrantes.length}** membros selecionados para o projeto **{equipeFormada.projeto.nome}**.
                            </p>

                            <ul className="space-y-3">
                                {equipeFormada.integrantes.map((colaborador, index) => (
                                    <li key={colaborador.id} className="p-3 border border-green-300 rounded bg-white shadow-sm">
                                        <div className="font-semibold text-gray-800">
                                            {index + 1}. {colaborador.nome} (ID: {colaborador.id})
                                        </div>
                                        <div className="text-sm text-gray-600 ml-5">
                                            **Personalidade:** {colaborador.personalidade}
                                            <br/>
                                            **Habilidades:** {colaborador.habilidades.join(', ') || 'N/A'}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}

export default Gerador;
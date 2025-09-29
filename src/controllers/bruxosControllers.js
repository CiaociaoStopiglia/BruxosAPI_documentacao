import dados from "../models/dados.js";
const { bruxos } = dados;

const getAllBruxos = (req, res) => {
    let resultado = bruxos;

    // FILTROS AQUI

    res.status(200).json({
        total: resultado.length,
        data: resultado,
        message: "Lista de bruxos convocada com sucesso!"
    });
}

const getBruxosById = (req, res) => {
    const id = parseInt(req.params.id);
    const bruxos = bruxos.find(m => m.id === id);

    if (!bruxos) {
        res.status(404).json({
            success: false,
            message: `Nenhum bruxo foi encontrado no Beco Diagonal com o id ${id}`
        })
    }

    res.status(200).json({
        total: bruxos.length,
        data: bruxos
    })
}

const createBruxo= (req, res) => {
    const { nome, idade, casa, habilidade, foto } = req.body;

    const casasHogwarts = ["Grifinória", "Sonserina", "Lufa-Lufa", "Corvinal"];
    const habilidadesPermitidas = ["Feitiço", "Poção", "Metamorfomagia", "Magia das Trevas", "Transfiguração", "Adivinhação", "Defesa Contra as Artes das Trevas", "Herbologia"];

    // Validações dos campos obrigatórios

    if(!casa) {
        return res.status(400).json({
            success:false,
            message: "O campo 'casa' é obrigatório"
        })
    }

    if (!nome) {
        return res.status(400).json({
            success: false,
            message: "O campo 'nome' é obrigatório"
        });
    }

    if (!idade) {
        return res.status(400).json({
            success: false,
            message: "O campo 'idade' é obrigatório"
        });
    }


    if (!habilidade) {
        return res.status(400).json({
            success: false,
            message: "O campo 'habilidade' é obrigatório"
        });
    }

    const BruxoExistente = bruxos.find(b => b.nome.toLowerCase() === nome.toLowerCase());
    if (BruxoExistente) {
        return res.status(409).json({
            success: false,
            message: `O Bruxo ${nome} já está cadastrado no Beco Diagonal`
        });
    }


    //Regras de negocio
    if (idade < 11) { //Um monstro só pode ser criado/atualizado se tiver 1600 anos ou mais.
        return res.status(400).json({
            success: false,
            message: "A idade mínima para um bruxo é 11 anos"
        })
    }

    if (!casasHogwarts.includes(casa)) { //
        return res.status(400).json({
            success: false,
            message: `A casa "${casa}" não é válida. Casas permitidas: ${casasHogwarts.join(", ")}.`
        });
    }

    if (!habilidadesPermitidas.includes(habilidade)) {
        return res.status(400).json({
            success: false,
            message: `A habilidade "${habilidade}" não é válida. Habilidades permitidas: ${habilidadesPermitidas.join(", ")}.`
        });
    }

    //Criar a monster high

    const novoBruxo = {
      id: bruxos.length + 1,
        nome: nome,
        idade,
        casa,
        habilidade,
        dataDeCadastro: new Date(),
        foto
    }

    bruxos.push(novaMonster);

    res.status(201).json({
        success: true,
        message: "Novo Bruxo Cadastrada com sucesso",
        data: novoBruxo
    })

}

const deleteBruxo = (req, res) => {
    const { id } = req.params

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const idParaApagar = parseInt(id);

    const bruxoParaRemover = bruxos.find(m => m.id === idParaApagar);
    console.log(bruxoParaRemover)

    if (!bruxoParaRemover) {
        return res.status(404).json({
            success: false,
            message: "Bruxo id não existe"
        });
    }

    const bruxoFiltrado = bruxos.filter(m => m.id !== id);
    console.log(bruxoFiltrado)

    bruxos.splice(0, bruxos.length, ...bruxoFiltrado);

    return res.status(200).json({
        success: true,
        message: "Bruxo expulso de Hogwarts com sucesso!"
    })
}

const updateBruxo = (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, idade, casa, habilidade, foto } = req.body;

    const casasHogwarts = ["Grifinória", "Sonserina", "Lufa-Lufa", "Corvinal"];
    const habilidadesPermitidas = ["Feitiço", "Poção", "Metamorfomagia", "Magia das Trevas", "Transfiguração", "Adivinhação", "Defesa Contra as Artes das Trevas", "Herbologia"];

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "O id deve ser válido"
        });
    }

    const bruxoExiste = monsters.find(m => m.id === id);

    if (!bruxoExiste) {
        return res.status(404).json({
            success: false,
            message: "Não é possível reparar o que não existe! não existe"
        });
    }

    //Regras de negocio
    if (idade < 11) {
        return res.status(400).json({
            success: false,
            message: "A idade deve ser superior ou igual 11"
        })
    }

    // O tipo esta vindo indefinido, logo este tipo nao esta no array de tipos, entao ele trava.

    if (!casasHogwarts.includes(casa)) { //
        return res.status(400).json({
            success: false,
            message: `A casa "${casa}" não é válida. Casas permitidas: ${casasHogwarts.join(", ")}.`
        });
    }

    if (!habilidadesPermitidas.includes(habilidade)) {
        return res.status(400).json({
            success: false,
            message: `A habilidade "${habilidade}" não é válida. Habilidades permitidas: ${habilidadesPermitidas.join(", ")}.`
        });
    }



    const bruxosAtualizados = bruxos.map(bruxo =>
        bruxo.id === id
            ? {
                ...bruxo,
                ...(nome && { nome }),
                ...(idade && { idade }),
                ...(casa && { casa }),
                ...(habilidade && { habilidade }),
                ...(foto && { foto })
            }
            : bruxo
    );

    bruxos.splice(0, bruxos.length, ...bruxosAtualizados);

    const bruxoFinal = bruxos.find(m => m.id === id);

    res.status(200).json({
        success: true,
        message: "Monstro atualizado com sucesso",
        bruxo: bruxoFinal
    })

}

export { getAllBruxos, getBruxosById, createBruxo, deleteBruxo, updateBruxo };
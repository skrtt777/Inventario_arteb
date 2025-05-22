async function verListaTabelas() {
    document.getElementById("menu").classList.add("escondido");

    const select = document.getElementById("select-tabela");
    select.innerHTML = '<option value="">-- Escolha uma tabela --</option>';

    try {
        const response = await fetch("http://192.168.0.188/inventario_qr_showtables.php"); // você precisa criar isso
        const tabelas = await response.json();

        tabelas.forEach(tabela => {
            const option = document.createElement("option");
            option.value = tabela;
            option.textContent = tabela;
            select.appendChild(option);
        });

        document.getElementById("tabelas").classList.remove("escondido");
    } catch (err) {
        alert("Erro ao buscar tabelas: " + err.message);
    }
}

async function verDadosDaTabela(tabela) {
    if (!tabela) return;

    try {
        const response = await fetch(`http://192.168.0.188/inventario_qr_gettabela.php?tabela=${tabela}`);
        const dados = await response.json();

        const table = document.getElementById("tabela-dados");
        table.innerHTML = "";

        if (dados.length === 0) {
            table.innerHTML = "<tr><td>Nenhum dado encontrado</td></tr>";
            return;
        }

        // Cabeçalho
        const headerRow = document.createElement("tr");
        Object.keys(dados[0]).forEach(key => {
            const th = document.createElement("th");
            th.textContent = key;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        // Linhas
        dados.forEach(item => {
            const row = document.createElement("tr");
            Object.values(item).forEach(val => {
                const td = document.createElement("td");
                td.textContent = val;
                row.appendChild(td);
            });
            table.appendChild(row);
        });

        document.getElementById("dados-tabela").classList.remove("escondido");
    } catch (err) {
        alert("Erro ao buscar dados: " + err.message);
    }
}

function importarItens() {
    alert("Função de importação ainda não implementada.");
}

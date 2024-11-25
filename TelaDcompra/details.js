document.addEventListener('DOMContentLoaded', () => {
    const colorOptions = document.querySelectorAll('.color-option');
    const cepInput = document.getElementById('cep-input');
    const calculateFreteButton = document.getElementById('calculate-frete');
    const freteResult = document.getElementById('frete-result');
    const productImage = document.querySelector('.product-image');

    // Escolha da cor e troca da imagem
    colorOptions.forEach(button => {
        button.addEventListener('click', () => {
            const chosenColor = button.dataset.color;
            const newImage = button.dataset.img;

            // Altera a imagem do produto
            productImage.src = newImage;

        });
    });

    // Função para buscar detalhes do CEP
    async function buscarCEP(cep) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erro ao buscar o CEP");
            const data = await response.json();

            if (data.erro) {
                throw new Error("CEP não encontrado");
            }
            return data;
        } catch (error) {
            console.error(error.message);
            throw new Error("Erro ao buscar o CEP");
        }
    }

    // Calcular frete
    calculateFreteButton.addEventListener('click', async () => {
        const cep = cepInput.value.trim();

        if (!cep || isNaN(cep) || cep.length !== 8) {
            freteResult.textContent = "Por favor, insira um CEP válido.";
            freteResult.style.color = "red";
            return;
        }

        try {
            // Buscar detalhes do CEP
            const cepData = await buscarCEP(cep);
            const cidade = cepData.localidade;
            const estado = cepData.uf;

            // Simulação de cálculo de frete
            const valorFrete = (Math.random() * (20 - 5) + 5).toFixed(2); // Entre R$5 e R$20

            freteResult.textContent = `Frete para ${cidade} - ${estado}: R$ ${valorFrete}`;
            freteResult.style.color = "green";
        } catch (error) {
            freteResult.textContent = "Erro ao buscar detalhes do CEP.";
            freteResult.style.color = "red";
        }
    });
});

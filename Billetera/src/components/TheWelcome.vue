<script setup>

import { ref, onMounted, watch} from 'vue';
import cryptoApi from '@/services/apiCrypto';
import apiClient from '@/services/apiClient';
import { useUserStore } from '@/store/user'; 

const cryptos = ref(['BTC', 'ETH', 'DOGE']);
const selectedCrypto = ref('');
const selectedAction = ref('');
const selectedFiat = ref('ARS');
const cryptosPrices = ref([]);
//const amount = ref(0);
//const message = ref('');
const transactions = ref([]);
const cryptoHoldings = ref([]);
const totalMoney = ref(0);
const userStore = useUserStore();
//const ErrorMessage = ref('');

const fetchCryptoPrices = async () => {
  cryptosPrices.value = [];
  try {
    for (const crypto of cryptos) {
      const response = await cryptoApi.get(`/lemoncash/${crypto}/${selectedFiat.value}/1`)
     cryptosPrices.value.push({
      crypto,
      price: response.data.bid || 0,
      });
    }
  } catch (error) {
    console.error('Error al obtener precios de criptomonedas:', error);
  }
};

const fetchUserTransactions = async (userId) => {
  try {
    const response = await apiClient.get(`transactions?q={"user_id": "${userId}"}`);
    transactions.value = response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
};

const calculateHoldings = async () => {
  const holdings = {};
  let total = 0;

  transactions.value.forEach((txn) => {
    const {crypto_code, crypto_amount, action} = txn;
    if (!holdings[crypto_code]) {
      holdings[crypto_code] = 0;
    }

    holdings[crypto_code] += action === 'purchase' ? parseFloat(crypto_amount) : -parseFloat(crypto_amount);
  });

  for (const [crypto, amount] of Object.entries(holdings)) {
    if (amount > 0) {
      const priceData = await fetchCryptoPrice(crypto);
      const price = priceData.bid || 0;  //Se usa el bid price para calcular
      total += price * amount;

      cryptoHoldings.value.push({
        crypto,
        amount,
        money: (price * amount).toFixed(4),
      });
    }
  }

  totalMoney.value = total.toFixed(4);
};

const fetchCryptoPrice = async (cryptoCode) => {
  try {
    const response = await cryptoApi.get(`/lemoncash/${cryptoCode}/ars`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el precio para ${cryptoCode}:`, error);
    return {};
  }
};

onMounted(async () => {
  try {
    const userId = userStore.userId;
    await fetchUserTransactions(userId);
    await calculateHoldings();
  } catch (error) {
    console.error('Error al inicializar el componente:', error);
    errorMessage.value = 'Error al cargar datos.';
  };
});

onMounted(() => {
  watch(selectedFiat, fetchCryptoPrices);
});

</script>

<template>

<div class="crypto-table">
  <h2>Criptomonedas para operar</h2>

  <div class="fiat-selector">
    <label for="fiat">Moneda:</label>
    <select id="fiat" v-model="selectedFiat">
      <option value="ARS">ARS</option>
      <option value="USD">USD</option>
    </select>
  </div>


  <table v-if="cryptos.length">
    <thead>
      <tr>
        <th>Criptomoneda</th>
        <th>Precio {{ selectedFiat }}</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="crypto in cryptos" :key="crypto.crypto">
        <td>{{ crypto.crypto }}</td>
        <td>{{ crypto.price }}</td>
        <td>
          <button @click="selectedCrypto = crypto.crypto; selectedAction = 'buy'">Comprar</button>
          <button @click="selectedCrypto = crypto.crypto; selectedAction = 'sell'">Vender</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>



<div class="financial-status">
  <h2>Estado financiero</h2>
  <table>
    <thead>
      <tr>
        <th>Criptomoneda</th>
        <th>Cantidad</th>
        <th>Dinero</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="holding in cryptoHoldings" key="holding.crypto">
        <td>{{ holding.crypto }}</td>
        <td>{{ holding.amount }}</td>
        <td>{{ holding.money }}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2"><strong>Total</strong></td>
        <td>$ {{ totalMoney }}</td>
      </tr>
    </tfoot>
  </table>
</div>

</template>

<style scoped>

.crypto-table {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.fiat-selector {
  margin-bottom: 20px;
}

.financial-status {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

tfoot td {
  font-weight: bold;
}

button:hover {
  background-color: #ddd;
}

.message {
  margin-top: 20px;
  font-weight: bold;
  color: green;
}
</style>
import versao from "../signals/versao";
import axios from 'axios';
import { elo, loading, matches, summoner } from "../signals/signalsUser";


export const version  = () =>{
    axios
    .get("https://ddragon.leagueoflegends.com/api/versions.json")
    .then((response) => {
      if (response.data && response.data.length > 0) {
        versao.value = response.data[0];
      }
    })
    .catch((error) => {
      console.error("Erro ao achar a versão:", error);
    });
};


export const handleSearch = async (gameName, tagLine) => {
    loading.value = true;
    try {
        const response = await axios.get(`http://localhost:3090/search/${gameName}/${tagLine}`);
        const data = response.data;
        console.log('resultado:',response.data)
        summoner.value = data.summoner;
        elo.value = data.league;
        matches.value = data.matches;
       
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Não foi posivel achar o jogador:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    } finally {
        loading.value = false;
    }
};

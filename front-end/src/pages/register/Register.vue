<template>
      <div class="col-xs-12 col-md-12">
        <div class="card">
          <div class="card-header">
            <strong>Cadastrar Monitoramento</strong>
          </div>
          <div class="card-body card-block">
            <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
              <div class="row form-group">
                <div class="col col-md-3"><label for="query-input" class=" form-control-label">Query</label></div>
                <div class="col-12 col-md-9"><input required type="text" v-model="query" id="query-input" name="query-input" placeholder="Query" class="form-control"></div>
              </div>
              <div class="row form-group">
                <div class="col col-md-3"><label for="description-input" class=" form-control-label">Descrição</label></div>
                <div class="col-12 col-md-9"><input type="text" v-model="name" id="description-input" name="description-input" placeholder="Descrição" class="form-control"></div>
              </div>
              <div class="row form-group">
                <div class="col col-md-3"><label for="selectSm" class=" form-control-label">Estado</label></div>
                <div class="col-12 col-md-9">
                  <select @change="selectState($event)"  name="selectSm" id="SelectLm" class="form-control-sm form-control">
                    <option v-for="item in estados" :key="item.value" :value="item.value">{{item.text}}</option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col col-md-3"><label for="selectSm" class=" form-control-label">Cidade</label></div>
                <div class="col-12 col-md-9">
                  <select v-if="!estado" name="selectSm" id="SelectLm" class="form-control-sm form-control">
                    <option :key="null" :value="null">
                      Selecione uma cidade
                    </option>
                  </select>

                  <select v-else @change="selectCity($event)" name="selectSm" id="SelectLm" class="form-control-sm form-control">
                    <option v-for="item in brasil[estado].cidades" :key="item" :value="item">
                      {{ item }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="row form-group">
                <div class="col col-md-3"><label class=" form-control-label">Raio</label></div>
                <div class="col col-md-9">
                  <div class="form-check-inline form-check">
                    <label for="inline-radio1" class="form-check-label col-md-4">
                      <input v-model="radius" type="radio" id="inline-radio1" name="inline-radios" value="10km" class="form-check-input">10 km
                    </label>
                    <label for="inline-radio2" class="form-check-label col-md-4">
                      <input v-model="radius" type="radio" id="inline-radio2" name="inline-radios" value="15km" class="form-check-input">15 km
                    </label>
                    <label for="inline-radio3" class="form-check-label col-md-4">
                      <input v-model="radius" type="radio" id="inline-radio3" name="inline-radios" value="20km" class="form-check-input">20 km
                    </label>
                  </div>
                </div>
              </div>
              <div class="row form-group">
                <div class="col col-md-3"><label for="image-input" class=" form-control-label">Imagem</label></div>
                <div class="col-12 col-md-9"><input v-model="image" type="text" id="image-input" name="image-input" placeholder="Link da imagem (.jpg, .png, .gif)" class="form-control">
                  <small class="form-text text-muted">Recomendamos uma imagem quadrada</small>
                </div>
              </div>
              <div class="row form-group">
                <div class="col col-md-3"><label for="email-input" class=" form-control-label">Interessado</label></div>
                <div class="col-12 col-md-9"><input v-model="interested" type="email" id="email-input" name="email-input" placeholder="Endereço de email do interessado no monitoramento" class="form-control"></div>
              </div>
            </form>
          </div>
          <div class="card-footer">
            <button @click="registerMonitoring()" type="submit" class="btn btn-primary btn-sm">
              <i class="fa fa-dot-circle-o"></i> Confirmar
            </button>
            <span class="badge badge-success" v-if="success">Cadastro Realizado</span> 
            <span class="badge badge-danger" v-if="errors">{{ errors }}</span> 
          </div>
        </div>

      </div>
</template>

<script>
  import brasil from "../../assets/files/brasil.json";
  import dadosCidades from "../../assets/files/municipios.json";
  import crypto from "crypto";
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import qs from "querystring";


  export default {
    name: 'Register',
    data () {
      return {
        success: false,
        errors: null,
        query: null,
        name: null,
        latitude: null,
        longitude: null,
        radius: null,
        interested: null,
        image: null,
        estado: null,
        cidade: null,
        brasil,
        dadosCidades,
        estados: [
        { value: null, text: "Selecione um estado" },
        { value: "AC", text: "Acre" },
        { value: "AL", text: "Alagoas" },
        { value: "AP", text: "Amapá" },
        { value: "AM", text: "Amazonas" },
        { value: "BA", text: "Bahia" },
        { value: "CE", text: "Ceará" },
        { value: "DF", text: "Distrito Federal" },
        { value: "ES", text: "Espírito Santo" },
        { value: "GO", text: "Goiás" },
        { value: "MA", text: "Maranhão" },
        { value: "MT", text: "Mato Grosso" },
        { value: "MS", text: "Mato Grosso do Sul" },
        { value: "MG", text: "Minas Gerais" },
        { value: "PA", text: "Pará" },
        { value: "PB", text: "Paraíba" },
        { value: "PR", text: "Paraná" },
        { value: "PE", text: "Pernambuco" },
        { value: "PI", text: "Piauí" },
        { value: "RJ", text: "Rio de Janeiro" },
        { value: "RN", text: "Rio Grande do Norte" },
        { value: "RS", text: "Rio Grande do Sul" },
        { value: "RO", text: "Rondônia" },
        { value: "RR", text: "Roraima" },
        { value: "SC", text: "Santa Catarina" },
        { value: "SP", text: "São Paulo" },
        { value: "SE", text: "Sergipe" },
        { value: "TO", text: "Tocantins" }]
      }
    }, 
    methods: {
      selectState: function(event) {
        this.estado = event.target.value;
        this.cidade = brasil[this.estado].cidades[0];
      },
      selectCity: function(event) {
        this.cidade = event.target.value;
      },
      registerMonitoring: function() {
        let errorsTemp = [];

        if(!this.query) {
          errorsTemp.push('query');
        }

        if(!this.name) {
          errorsTemp.push('descrição');
        }

        if(!this.cidade) {
          errorsTemp.push('estado/cidade');
        }

        if(!this.radius) {
          errorsTemp.push('raio');
        }

        if(!this.image) {
          errorsTemp.push('imagem');
        }

        if(!this.interested) {
          errorsTemp.push('interessado');
        }

        if(errorsTemp.length > 0) {
          let errorText = 'Campo(s) obrigatório(s): ';

          for(var i in errorsTemp) {
            errorText += errorsTemp[i];

            if(errorsTemp.length - 1 != i) {
              errorText += ', ';
            }
          }

          this.errors = errorText;
          return;
        }

        dadosCidades.forEach(c => {
            if (c.nome == this.cidade) {
              this.latitude = c.latitude;
              this.longitude = c.longitude;
            }
        });

        let count = 100, tweetMode = 'extended', resultType = 'recent';

        let id = crypto.createHash("md5").update(this.query + count + tweetMode + this.cidade + this.latitude + this.longitude + this.radius).digest("hex");

        let url = 'https://187aqgbgt3.execute-api.us-east-2.amazonaws.com/dev/save';

        let date = new Date(Date.now());

        let requestBody = {
          table: 'monitorings',
          tweetMode: tweetMode,
          resultType: resultType,
          count: count,
          query: this.query,
          cityName: this.cidade,
          lat: this.latitude,
          long: this.longitude,
          radius: this.radius,
          name: this.name, 
          interested: this.interested,
          image: this.image,
          id: id,
          lastDate: 'X' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
        }

        let config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }}

        axios.post(url, qs.stringify(requestBody), config)
          .then((result) => {
            this.success = true;
          })
          .catch((err) => {
            this.errors = err;
          })
      }
    }

  }
</script>

<style lang="scss">
  .register {

    h2 {
      text-align: center;
    }
    width: 21.375rem;

    .down-container {
      margin-top: 2.6875rem;
    }
  }
</style>

<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div class="page-header-image" style="background-image: url('img/header.jpg')"></div>
    <div class="content">
      <div class="container">
        <h3>Autômato Finito Não Determinístico com Transições ε (AFN-ε)</h3>
        <div class="row">
          <div class="col-md-4 ml-auto mr-auto">
            <card type="login" plain>
              <div slot="header">
                <h5>Estado Inicial</h5>
                <fg-input class="no-border input-lg" placeholder="ex: q0" v-model="estado_inicial"></fg-input>

                <h5>Estados Finais</h5>
                <fg-input
                  class="no-border input-lg"
                  placeholder="ex: q1 q2 q3"
                  v-model="estados_finais"
                ></fg-input>
                <a class="aviso">cada estado deve ser separado por espaço</a>

                <h5 style="margin-top: 15px">Função de Transição</h5>
                <div
                  style="margin-left: 1px"
                  class="row"
                  v-for="item in funcao_transicao"
                  :key="item.estado"
                >
                  <badge style="margin-right: 5px" type="info">{{item.estado}}</badge>
                  <div v-for="t in item.transicoes" :key="t.simbolo">
                    <badge
                      style="margin-right: 5px"
                      type="success"
                    >{{t.simbolo + ' -> ' + t.estado}}</badge>
                  </div>
                </div>
              </div>
            </card>
          </div>

          <div class="col-md-4 ml-auto mr-auto">
            <card type="login" plain>
              <h5>Estado de Origem</h5>
              <fg-input
                class="no-border input-lg"
                placeholder="ex: q0"
                v-model="item_transicao.estado"
              ></fg-input>

              <h5>Símbolo</h5>
              <fg-input
                class="no-border input-lg"
                placeholder="ex: epsilon, ex: 0"
                v-model="simbolo"
              ></fg-input>
              <a class="aviso">escreva epsilon para se referir a ε</a>

              <h5 style="margin-top: 10px">Estado de Destino</h5>
              <fg-input class="no-border input-lg" placeholder="ex: q1" v-model="estado"></fg-input>
              <a class="aviso">coloque um único estado de destino por vez</a>
              <n-button
                v-if="item_transicao.estado != '' && simbolo != '' && estado != ''"
                class="btn-block"
                type="primary"
                size="lg"
                round
                @click="add_transicao"
              >Adicionar Transição</n-button>
              <n-button v-else class="btn-block" type="primary" size="lg" round>Adicionar Transição</n-button>
            </card>
          </div>

          <div class="col-md-4 ml-auto mr-auto">
            <h5 v-if="sequencia_execucao[0]">Sequência de Execução</h5>
            <card type="login" plain>
              <div v-if="sequencia_execucao[0]" style="margin-bottom:10px">
                <div
                  class="row"
                  style="margin-left: 1px"
                  v-for="(item, index) in sequencia_execucao"
                  :key="index"
                >
                  <badge style="margin-right: 5px" type>{{item.step.index}}</badge>
                  <badge style="margin-right: 5px" type="info">{{item.step.estado}}</badge>
                  <badge
                    style="margin-right: 5px"
                    type="success"
                    v-for="(t, index) in item.step.transicoes"
                    :key="index"
                  >{{' ' + t.simbolo + ' -> ' + t.estado + ' '}}</badge>
                </div>
                <badge
                  style="margin-top: 10px"
                  :type="aceita? 'success':'danger'"
                >{{aceita? 'ACEITA':'REJEITADA'}}</badge>
              </div>

              <a>ef: {{estados_finais}}</a>
              <a>ea: {{estados_atuais}}</a>

              <fg-input class="no-border input-lg" placeholder="String" v-model="texto"></fg-input>
              <a class="aviso">não insira simbolos que não fazem parte do alfabeto</a>

              <n-button
                class="btn-block"
                type="primary"
                size="lg"
                round
                @click="automato"
              >Testar String</n-button>
            </card>
          </div>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput, Badge } from "@/components";
import MainFooter from "@/layout/MainFooter";
export default {
  name: "login-page",
  bodyClass: "login-page",
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    Badge,
  },
  data() {
    return {
      sequencia_execucao: [],
      texto: "",
      estado_inicial: "q0",
      estados_atuais: [],
      estados_finais: "q3",
      funcao_transicao: [
        {
          estado: "q0",
          transicoes: [
            { simbolo: "0", estado: "q0" },
            { simbolo: "epsilon", estado: "q1" },
          ],
        },
        {
          estado: "q1",
          transicoes: [{ simbolo: "epsilon", estado: "q2" }],
        },
        {
          estado: "q2",
          transicoes: [{ simbolo: "epsilon", estado: "q3" }],
        },
        {
          estado: "q3",
          transicoes: [],
        },
      ],
      item_transicao: {
        estado: "",
        transicoes: [],
      },
      simbolo: "",
      estado: "",
      aceita: false,
    };
  },
  methods: {
    add_transicao() {
      let index;
      if (this.funcao_transicao[0]) {
        index = this.buscar_estado(this.item_transicao.estado);
        if (index > -1) {
          this.add_transicao_em_estado_existente(index);
        } else this.add_novo_estado();
      } else this.add_novo_estado();
      this.simbolo = "";
      this.estado = "";
      this.item_transicao = {
        estado: "",
        transicoes: [],
      };
    },

    add_novo_estado() {
      this.item_transicao.transicoes.push({
        simbolo: this.simbolo,
        estado: this.estado,
      });
      this.funcao_transicao.push(this.item_transicao);
      if (this.estado_inicial == "")
        this.estado_inicial = this.item_transicao.estado;

      let index_estado_aux;
      index_estado_aux = this.buscar_estado(this.estado);
      if (index_estado_aux < 0) this.add_estado_sem_transicoes(this.estado);
    },

    add_transicao_em_estado_existente(index) {
      this.funcao_transicao[index].transicoes.push({
        simbolo: this.simbolo,
        estado: this.estado,
      });

      let index_estado_aux;
      index_estado_aux = this.buscar_estado(this.estado);
      if (index_estado_aux < 0) this.add_estado_sem_transicoes(this.estado);
    },

    add_estado_sem_transicoes(estado) {
      this.funcao_transicao.push({
        estado: estado,
        transicoes: [],
      });
    },

    buscar_estado(estado) {
      return this.funcao_transicao.findIndex((obj) => obj.estado == estado);
    },

    automato() {
      this.aceita = false;
      this.sequencia_execucao = [];
      let estados_finais = this.estados_finais.split(" ");
      this.estados_atuais = [];
      this.estados_atuais.push(this.estado_inicial);

      this.texto.split("").forEach((c, index) => {
        let objs = this.funcao_transicao.filter((obj) =>
          this.estados_atuais.includes(obj.estado)
        );
        this.estados_atuais = [];
        objs.forEach((t) => {
          let estados_aux = [];
          if (t.transicoes) {
            estados_aux = t.transicoes.filter(
              (obj) => obj.simbolo == c || obj.simbolo == "epsilon"
            );
            if (estados_aux[0]) {
              estados_aux.forEach((item) => {
                this.estados_atuais.push(item.estado);
              });
              let step = {
                index: index,
                estado: t.estado,
                transicoes: estados_aux,
              };
              this.sequencia_execucao.push({ step });
            }
          }
        });
      });

      /////////////////////////
      let aux_estados_atuais = this.estados_atuais;
      let continuar = true;

      while (continuar) {
        let itens_funcao_transicao = this.funcao_transicao.filter((obj) =>
          this.estados_atuais.includes(obj.estado)
        );

        let aux_ea = this.estados_atuais;
        this.estados_atuais = [];
        itens_funcao_transicao.forEach((t) => {
          let estados_aux = [];
          if (t.transicoes) {
            estados_aux = t.transicoes.filter(
              (obj) => obj.simbolo == "epsilon"
            );
            if (estados_aux[0]) {
              estados_aux.forEach((item) => {
                this.estados_atuais.push(item.estado);
              });
              let step = {
                // index: index,
                estado: t.estado,
                transicoes: estados_aux,
              };
              this.sequencia_execucao.push({ step });
            }
          }
        });
        if (!this.estados_atuais[0]) {
          this.estados_atuais = aux_ea;
          continuar = false;
        }
      }
      /////////////////////////

      this.estados_finais.split(" ").forEach((ef) =>
        this.estados_atuais.forEach((ea) => {
          if (ef == ea) {
            this.aceita = true;
            return;
          }
        })
      );
    },
  },
};
</script>
<style></style>

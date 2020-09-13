<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div class="page-header-image" style="background-image: url('img/header.jpg')"></div>
    <div class="content">
      <div class="container">
        <h3>Autômato Finito Não Determinístico (AFN)</h3>
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

                <div v-if="funcao_transicao_afd && funcao_transicao_afd[0]">
                  <h5 style="margin-top: 15px">Função de Transição AFD</h5>
                  <div
                    style="margin-left: 1px"
                    class="row"
                    v-for="item in funcao_transicao_afd"
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
              <fg-input class="no-border input-lg" placeholder="ex: 0" v-model="simbolo"></fg-input>

              <h5>Estado de Destino</h5>
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

              <fg-input class="no-border input-lg" placeholder="String" v-model="texto"></fg-input>
              <a class="aviso">não insira simbolos que não fazem parte do alfabeto</a>

              <n-button
                class="btn-block"
                type="primary"
                size="lg"
                round
                @click="automato"
              >Testar String</n-button>

              <n-button
                class="btn-block"
                type="danger"
                size="lg"
                round
                @click="converter"
              >Converter para AFD</n-button>
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
            { simbolo: "0", estado: "q1" },
            { simbolo: "1", estado: "q0" },
          ],
        },
        {
          estado: "q1",
          transicoes: [
            { simbolo: "0", estado: "q2" },
            { simbolo: "1", estado: "q2" },
          ],
        },
        {
          estado: "q2",
          transicoes: [{ simbolo: "0", estado: "q3" }],
        },
        {
          estado: "q3",
          transicoes: [
            { simbolo: "0", estado: "q3" },
            { simbolo: "1", estado: "q3" },
          ],
        },
      ],
      funcao_transicao_afd: [],
      item_transicao: {
        estado: "",
        transicoes: [],
      },
      item_transicao_afd: {
        estado: "",
        transicoes: [],
      },
      simbolo: "",
      estado: "",
      simbolo_afd: "",
      estado_afd: "",
      aceita: false,
    };
  },
  methods: {
    converter() {
      this.iniciar_conversao_afd();
      let continuar = true;
      let i = 1; //indice da função de transição do afd
      while (this.funcao_transicao_afd[i]) {
        let estados_originais = this.funcao_transicao_afd[i].estado.split(" ");
        this.item_transicao_afd.estado = this.funcao_transicao_afd[i].estado;
        let estados_agrupados = [];
        estados_originais.forEach((e) => {
          this.funcao_transicao[this.buscar_estado(e)].transicoes.forEach(
            (item) => {
              estados_agrupados.push(item);
            }
          );
        });
        this.separar_simbolos_agrupar_estados(estados_agrupados, i);
        i++;
      }
      this.$router.push({
        name: "afd",
        params: {
          funcao_transicao: this.funcao_transicao_afd,
          estado_inicial: this.estado_inicial,
          estados_finais: this.estados_finais,
        },
      });
    },

    separar_simbolos_agrupar_estados(itens, index) {
      let simbolos = [];
      itens.forEach((e) => {
        if (!simbolos.includes(e.simbolo)) simbolos.push(e.simbolo);
      });
      simbolos.forEach((e) => {
        this.simbolo_afd = e;
        this.estado_afd = "";
        this.item_transicao_afd.estado = this.funcao_transicao_afd[
          index
        ].estado;
        itens.forEach((i) => {
          if (e == i.simbolo && !this.estado_afd.includes(i.estado))
            if (this.estado_afd == "") this.estado_afd = i.estado;
            else this.estado_afd = this.estado_afd + " " + i.estado;
        });
        this.add_transicao_afd();
      });
    },

    iniciar_conversao_afd() {
      let aux_simbolos = [];
      this.funcao_transicao_afd = [];
      this.funcao_transicao[0].transicoes.forEach((e) => {
        if (!aux_simbolos.includes(e.simbolo)) aux_simbolos.push(e.simbolo);
      });
      aux_simbolos.forEach((e) => {
        this.simbolo_afd = e;
        this.estado_afd = "";
        this.item_transicao_afd.estado = this.funcao_transicao[0].estado;
        this.funcao_transicao[0].transicoes.forEach((i) => {
          if (e == i.simbolo && !this.estado_afd.includes(i.estado))
            if (this.estado_afd == "") this.estado_afd = i.estado;
            else this.estado_afd = this.estado_afd + " " + i.estado;
        });
        this.add_transicao_afd();
      });
    },

    add_transicao_afd() {
      let index;
      if (this.funcao_transicao_afd[0]) {
        index = this.buscar_estado_afd(this.item_transicao_afd.estado);
        if (index > -1) {
          this.add_transicao_em_estado_existente_afd(index);
        } else this.add_novo_estado_afd();
      } else this.add_novo_estado_afd();
      this.simbolo_afd = "";
      this.estado_afd = "";
      this.item_transicao_afd = {
        estado: "",
        transicoes: [],
      };
    },

    add_novo_estado_afd() {
      this.item_transicao_afd.transicoes.push({
        simbolo: this.simbolo_afd,
        estado: this.estado_afd,
      });
      this.funcao_transicao_afd.push(this.item_transicao_afd);
      let index_estado_aux;
      index_estado_aux = this.buscar_estado_afd(this.estado_afd);
      if (index_estado_aux < 0)
        this.add_estado_sem_transicoes_afd(this.estado_afd);
    },

    buscar_estado_afd(estado) {
      return this.funcao_transicao_afd.findIndex((obj) => obj.estado == estado);
    },

    add_transicao_em_estado_existente_afd(index) {
      this.funcao_transicao_afd[index].transicoes.push({
        simbolo: this.simbolo_afd,
        estado: this.estado_afd,
      });

      let index_estado_aux;
      index_estado_aux = this.buscar_estado_afd(this.estado_afd);
      if (index_estado_aux < 0)
        this.add_estado_sem_transicoes_afd(this.estado_afd);
    },

    add_estado_sem_transicoes_afd(estado) {
      this.funcao_transicao_afd.push({
        estado: estado,
        transicoes: [],
      });
    },

    // *********** AFN *********** //

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
      let texto = this.texto.split("");
      this.estados_atuais = [];
      this.estados_atuais.push(this.estado_inicial);

      texto.forEach((c, index) => {
        let objs = this.funcao_transicao.filter((obj) =>
          this.estados_atuais.includes(obj.estado)
        );
        this.estados_atuais = [];
        objs.forEach((t) => {
          let estados_aux = [];
          if (t.transicoes) {
            estados_aux = t.transicoes.filter((obj) => obj.simbolo == c);
            if (estados_aux[0]) {
              estados_aux.forEach((item) =>
                this.estados_atuais.push(item.estado)
              );
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
      this.estados_finais.split(" ").forEach((ef) => {
        this.estado_atual.split(" ").forEach((ea) => {
          if (ef == ea) {
            this.aceita = true;
            return;
          }
        });
      });
    },
  },
};
</script>
<style></style>

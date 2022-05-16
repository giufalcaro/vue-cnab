<template>
  <div>
    <b-card no-body>
      <b-tabs ref="tabs" v-model="activeTab" content-class="mt-2" justified>
        <b-tab active :title="'Upload'">
          <div id="app" class="container mt-3">
            <b-row>
              <b-col class="col-3 mx-auto">
                <h3 class="form-title">Buscar documentos</h3>
                <upload-files></upload-files>
              </b-col>
            </b-row>
          </div>
        </b-tab>
        <b-tab active :title="'tabela'">
          <div id="app" class="container mt-3">
            <b-row>
              <b-col class="col-3 mx-auto">
                <FormulateForm
                  class="login-form"
                  v-model="formValues"
                  @submit="handleSubmit"
                >
                  <FormulateInput
                    name="cpf"
                    type="text"
                    label="Digite Cpf para buscar"
                    placeholder="cpf"
                  />
                  <FormulateInput
                    type="submit"
                    label="Buscar"
                    class="text-center"
                  />
                </FormulateForm>
              </b-col>
            </b-row>

            <b-card class="mt-3" header="Dados">
              <h5 class="form-title">Valor total na conta do cpf buscado:</h5>
              <pre class="code" v-text="formValues.valorTotal" />
              <b-table
                id="object-table"
                ref="object-table"
                striped
                hover
                :items="items"
                :fields="fields"
              >
              </b-table>
            </b-card>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import { BTable, BRow, BCol } from "bootstrap-vue";
import axios from "axios";
import UploadFiles from "./UploadFiles";

export default {
  components: {
    BTable,
    UploadFiles,
    BRow,
    BCol,
  },
  data() {
    return {
      formValues: {
        cpf: null,
        valorTotal: 0,
      },
      items: null,
      activeTab: 0,
    };
  },
  computed: {
    fields() {
      return [
        {
          key: "cartao",
          label: "Cartão",
          class: "text-center",
        },
        {
          key: "cpf",
          label: "Cpf",
          class: "text-center",
        },
        {
          key: "data",
          label: "Data",
          class: "text-center",
        },
        {
          key: "nomeLoja",
          label: "Nome da loja",
          class: "text-center",
        },
        {
          key: "nomeRepresentante",
          label: "Nome representante",
          class: "text-center",
        },
        {
          key: "tipo",
          label: "Tipo",
          class: "text-center",
        },
        {
          key: "valor",
          label: "Valor",
          class: "text-center",
        },
      ];
    },
  },
  beforeMount() {
    this.handleSubmit();
  },
  methods: {
    async handleSubmit() {
      let response;
      this.formValues.valorTotal = 0;
      if (!this.formValues.cpf) {
        response = await axios.get("http://localhost:8080/find");
      } else {
        response = await axios.get("http://localhost:8080/findByCpf", {
          headers: { cpf: this.formValues.cpf },
        });

        response.data.forEach((item) => {
          this.formValues.valorTotal = item.valor + this.formValues.valorTotal;
        });
      }

      this.items = response.data;
      console.log(response);
    },
  },
};
</script>

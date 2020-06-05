<template lang="html">
  <div class="text-center">
    <v-dialog v-model="dialog">
      <!-- width="800" -->
      <template v-slot:activator="{ on }">
        <v-card class="ma-5 flex-grow-1 elevation-12">
          <v-card-title primary-title class="d-flex justify-center">
            Добавить новый товар
          </v-card-title>
          <v-card-text class="d-flex justify-center">
            <v-img v-on="on" width="100" src="/new-item.png"></v-img
          ></v-card-text>
        </v-card>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Добавление нового товара
        </v-card-title>

        <v-card-text>
          <v-container
            grid-list-xs,sm,md,lg,xl
            fluid
            class="d-flex flex-column"
          >
            <v-row>
              <v-col cols="4" class="pl-0">
                <v-subheader>Категория товара</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-select
                  :items="selectCategory"
                  item-text="name"
                  item-value="name"
                  label="Тип товара"
                  hint="Выберите категорию добавляемого товара"
                  persistent-hint
                  v-model="selectData.selectCategory"
                ></v-select>
              </v-col>
            </v-row>

            <v-row v-if="getSelectProductName">
              <v-col cols="4" class="pl-0">
                <v-subheader>Название продукции</v-subheader>
              </v-col>
              <v-col cols="8">
                <v-select
                  :items="getSelectProductName"
                  label="Название продукции"
                  hint="Выберите название продукции добавляемого товара"
                  persistent-hint
                  v-model="selectData.selectProductName"
                ></v-select>
              </v-col>
            </v-row>

            <v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>DN</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="DN"
                    v-model="selectData.txtDN"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>

            <v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>PN</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="PN"
                    v-model="selectData.txtPN"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>

            <v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Температура рабочей среды</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="selectData.txtTempWorkEnv"
                    label="Температура рабочей среды"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>

            <v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Рабочая среда</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="selectData.txtWorkEnv"
                    label="Рабочая среда"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>

            <v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Материал корпуса</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="selectData.txtMaterial"
                    label="Материал корпуса"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>

            <v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Класс герметичности</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="selectData.txtClassGermetich"
                    label="Класс герметичности"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>

            <v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Тип исполнения</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="selectData.txtTypeIspolneniya"
                    label="Тип исполнения"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>

            <v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Строительная длина</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="selectData.txtBuildLength"
                    label="Строительная длина"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>

            <v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Описание</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-textarea
                    outlined
                    name="input-7-4"
                    label="Описание"
                    v-model="selectData.txtareaDescription"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-row>

            <v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Цена</v-subheader>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="selectData.txtPrice"
                    label="Цена"
                    suffix="Руб."
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-row>

            <v-row>
              <v-row>
                <v-col cols="4">
                  <v-subheader>Фото</v-subheader>
                </v-col>
                <v-col cols="8" class="d-flex flex-row">
                  <img
                    v-show="file !== null"
                    width="10%"
                    :src="showImageURL"
                    alt=""
                  />
                  <v-file-input
                    ref="myfile"
                    label="Загрузка изображения"
                    v-model="file"
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-row>

            <v-divider></v-divider>

            <v-row class="d-flex justify-end">
              <v-btn
                class="ma-5"
                color="green darken-3"
                dark
                @click="uploadImage"
              >
                Сохранить новый товар
              </v-btn>
              <v-btn
                class="ma-5"
                color="secondary"
                text
                outlined
                @click="clearAllFields"
              >
                Закрыть
              </v-btn>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      file: null,
      image: "",
      selectData: {
        selectCategory: "",
        selectProductName: "",
        txtDN: "",
        txtPN: "",
        txtTempWorkEnv: "",
        txtWorkEnv: "",
        txtMaterial: "",
        txtClassGermetich: "",
        txtTypeIspolneniya: "",
        txtBuildLength: "",
        txtareaDescription: "",
        txtPrice: "",
        ImageName: "",
        fileFormData: ""
      },
      selectCategory: [
        {
          id: 1,
          name: "Запорная арматура по международным стандартам",
          selectProductName: [
            "Клапан запорный стальной компактный",
            "Клапан запорный",
            "Задвижка кованая стальная (ЗКС)",
            "Задвижка стальная клиновая литая с выдвижным шпинделем",
            "Затвор (клапан) обратный поворотный"
          ]
        },
        {
          id: 2,
          name: "Запорная арматура",
          selectProductName: [
            "Кран шаровый цельносварной",
            "Кран шаровый запорный для нефтепровода",
            "Задвижка стальная шиберная"
          ]
        },
        {
          id: 3,
          name: "Регулирующая арматура",
          selectProductName: [
            "Кран шаровый запорно-регулирующий",
            "Затвор дисковый регулирующий"
          ]
        },
        {
          id: 4,
          name: "Защитная и предохранительная арматура",
          selectProductName: [
            "Клапан предохранительный с пневматической системой управления",
            "Главный предохранительный клапан (ГПК)"
          ]
        },
        {
          id: 5,
          name: "Устьевое оборудование",
          selectProductName: [
            "Арматура фонтанная",
            "Моноблочное устьевое оборудование",
            "Регулируемый и нерегулируемый шутуцер"
          ]
        }
      ]
    };
  },
  methods: {
    // print() {
    //   console.log(this.selectData);
    // },
    uploadImage() {
      if (
        this.file &&
        (this.selectData.selectCategory.trim().length !== 0 &&
          this.selectData.selectProductName.trim().length !== 0 &&
          this.selectData.txtDN.trim().length !== 0 &&
          this.selectData.txtPN.trim().length !== 0 &&
          this.selectData.txtTempWorkEnv.trim().length !== 0 &&
          this.selectData.txtWorkEnv.trim().length !== 0 &&
          this.selectData.txtMaterial.trim().length !== 0 &&
          this.selectData.txtClassGermetich.trim().length !== 0 &&
          this.selectData.txtTypeIspolneniya.trim().length !== 0 &&
          this.selectData.txtBuildLength.trim().length !== 0 &&
          this.selectData.txtareaDescription.trim().length !== 0 &&
          this.selectData.txtPrice.trim().length !== 0)
      )
        this.$store
          .dispatch("image/uploadImage", this.selectData.fileFormData)
          .then(imageName => {
            console.log(imageName);
            if (imageName) this.selectData.ImageName = imageName;
            this.sendNewProductData();
          })
          .catch(err => {
            console.log(err);
            throw new Error(err);
          });
      else {
        this.$store.dispatch("snackbar/activate", {
          text: "Заполните все поля перед сохранением продукта!",
          color: "yellow"
        });
        let timer = setTimeout(() => {
          this.$store.dispatch("snackbar/off");
        }, 5000);
      }
    },
    sendNewProductData() {
      this.$store
        .dispatch("product/newProduct", {
          Category: this.selectData.selectCategory.trim(),
          ProductName: this.selectData.selectProductName.trim(),
          DN: this.selectData.txtDN.trim(),
          PN: this.selectData.txtPN.trim(),
          TempWorkEnv: this.selectData.txtTempWorkEnv.trim(),
          WorkEnv: this.selectData.txtWorkEnv.trim(),
          Material: this.selectData.txtMaterial.trim(),
          ClassGermetich: this.selectData.txtClassGermetich.trim(),
          TypeIspolneniya: this.selectData.txtTypeIspolneniya.trim(),
          BuildLength: this.selectData.txtBuildLength.trim(),
          Description: this.selectData.txtareaDescription.trim(),
          Price: this.selectData.txtPrice.trim(),
          ImageName: this.selectData.ImageName.trim()
        })
        .then(() => {
          this.clearAllFields();
          this.$store.dispatch("snackbar/activate", {
            text: "Новый товар успешно добавлен!",
            color: "green"
          });
          let timer = setTimeout(() => {
            this.$store.dispatch("snackbar/off");
          }, 5000);
          this.updateProducts();
        })
        .catch(err => {
          this.$store.dispatch("snackbar/activate", {
            text: err.data.message || "Ошибка добавления нового товара",
            color: "red"
          });
          let timer = setTimeout(() => {
            this.$store.dispatch("snackbar/off");
          }, 5000);
        });
    },
    clearAllFields() {
      this.selectData.selectCategory = "";
      this.selectData.selectProductName = "";
      this.selectData.txtDN = "";
      this.selectData.txtPN = "";
      this.selectData.txtTempWorkEnv = "";
      this.selectData.txtWorkEnv = "";
      this.selectData.txtMaterial = "";
      this.selectData.txtClassGermetich = "";
      this.selectData.txtTypeIspolneniya = "";
      this.selectData.txtBuildLength = "";
      this.selectData.txtareaDescription = "";
      this.selectData.txtPrice = "";
      this.selectData.ImageName = "";
      this.selectData.fileFormData = "";
      this.file = null;
      this.dialog = false;
    },
    updateProducts() {
      this.$store
        .dispatch("product/getProduct")
        .then(products => {
          // console.log(products);
        })
        .catch(err => {
          this.$store.dispatch("snackbar/activate", {
            text: err.data.message || "Ошибка при получении данных о товарах!",
            color: "red"
          });
          let timer = setTimeout(() => {
            this.$store.dispatch("snackbar/off");
          }, 5000);
        });
    }
  },
  computed: {
    showImageURL() {
      if (this.file !== null) {
        let formData = new FormData();
        // formData.append("file", this.file, this.file.name);
        formData.append("file", this.file);
        this.selectData.fileFormData = formData;

        return URL.createObjectURL(this.file);
      } else {
        return "";
      }
    },
    getSelectProductName() {
      let a = this.selectData.selectCategory;

      if (a === "") {
        return false;
      } else {
        a = this.selectCategory.filter(item => {
          if (item.name === a) return true;
        });
        return a[0].selectProductName;
      }
    }
  }
};
</script>

<style lang="css" scoped></style>

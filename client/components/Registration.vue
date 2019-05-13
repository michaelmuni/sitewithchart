<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Registration</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form lazy-validation ref="regForm">
        <v-text-field
          name="firstName"
          label="First Name"
          type="text"
          v-model="firstName"
          required
          :rules="validationRules.name"
        ></v-text-field>
        <v-text-field
          name="lastName"
          label="Last Name"
          type="text"
          v-model="lastName"
          required
          :rules="validationRules.name"
        ></v-text-field>
        <v-text-field
          name="email"
          label="Email"
          type="email"
          v-model="email"
          required
          :rules="validationRules.email"
        ></v-text-field>
        <v-text-field
          id="password"
          name="password"
          label="Password"
          type="password"
          v-model="password"
          required
          :rules="validationRules.password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-alert dismissible v-if="error" type="error">{{ errorMessage }}</v-alert>
    <v-card-actions>
      <v-btn flat small color="error" @click="resetForm">Reset</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="register">Register</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: null,
    errorMessage: "",
    validationRules: {
      name: [
        v => !!v || "Required",
        v =>
          /^[a-zA-Z. ]+$/.test(v) ||
          "Name cannot contain numbers or special charachters."
      ],
      email: [
        v => !!v || "Required",
        v =>
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Invalid email format"
      ],
      password: [
        v => !!v || "Required",
        v => v.length >= 8 || "Password must be at least 8 characters long",
        v =>
          /[A-Z]/.test(v) ||
          "Password must contain at least one uppercase character",
        v =>
          /[a-z]/.test(v) ||
          "Password must contain at least one lowercase character",
        v =>
          /\d/.test(v) || "Password must contain at least one numeric character"
      ]
    }
  }),

  methods: {
    resetForm() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";

      this.$refs.regForm.resetValidation();
    },
    async register() {
      if (this.$refs.regForm.validate()) {
        try {
          const response = await this.$axios.post("user/register", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password
          });

          if (response.status !== "error") {
            await this.$store.dispatch("user/login", {
              email: this.email,
              password: this.password
            });

            this.$router.push("/overview");
          } else {
            this.error = true;
            this.errorMessage = response.message;
          }
        } catch (error) {
          this.error = true;
          this.errorMessage = error.response.data.message
            ? error.response.data.message
            : error.message;
        }
      }
    }
  }
};
</script>

<style>
</style>

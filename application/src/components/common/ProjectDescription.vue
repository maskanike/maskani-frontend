<template>
  <v-container fluid class="home_banner">
    <section class="home_bannerA jumbotron">
      <div class="container">
        <div class="row justify-content-end clearfix">
          <div class="col-lg-7 col-md-7 col-sm-12">
            <div class="home_banner_headline_wapper">
              <h1>
                Manage Your Tenants
                <span>Bila Stress!</span>
                <div class="home_banner_in">
                  <h4>
                    Maskani is a rental management application for the busy
                    person. Easily invoice &amp; send receipts to tenants via
                    SMS &amp; Email, and record important tenant information.
                  </h4>
                  <h3>
                    Give it a try, it's
                    <span>simple.</span>
                  </h3>
                </div>
              </h1>
            </div>
          </div>
          <div class="col-lg-5 col-md-5 col-sm-12">
            <div class="home_banner_cta_wrapper">
              <h4 class="titleA">Free for basic use</h4>
              <div class="home_banner_signup_form">
                <ValidationObserver v-slot="{ handleSubmit }">
                  <form @submit.prevent="handleSubmit(submit)">
                    <v-card-text>
                      <v-form>
                        <ValidationProvider
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            id="name"
                            :label="$t('signup.NAME')"
                            v-model="name"
                            prepend-icon="person"
                            :error="errors.length > 0"
                            :error-messages="errors[0]"
                            autocomplete="off"
                          />
                        </ValidationProvider>
                        <ValidationProvider
                          rules="required|email"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            id="email"
                            name="email"
                            type="text"
                            :label="$t('signup.EMAIL')"
                            v-model="email"
                            :error="errors.length > 0"
                            :error-messages="errors[0]"
                            autocomplete="off"
                            prepend-icon="email"
                          />
                        </ValidationProvider>
                        <ValidationProvider
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            id="phone"
                            name="phone"
                            type="phone"
                            :label="$t('signup.PHONE')"
                            v-model="phone"
                            :error="errors.length > 0"
                            :error-messages="errors[0]"
                            autocomplete="off"
                            prepend-icon="phone"
                          />
                        </ValidationProvider>
                        <ValidationProvider
                          rules="required|min:5"
                          v-slot="{ errors }"
                          vid="password"
                        >
                          <v-text-field
                            id="password"
                            name="password"
                            type="password"
                            :label="$t('signup.PASSWORD')"
                            v-model="password"
                            :error="errors.length > 0"
                            :error-messages="errors[0]"
                            ref="password"
                            autocomplete="off"
                            prepend-icon="lock"
                          />
                        </ValidationProvider>
                        <ValidationProvider
                          rules="required|min:5"
                          v-slot="{ errors }"
                          vid="password"
                        >
                          <v-text-field
                            prepend-icon="lock"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            :label="$t('signup.CONFIRM_PASSWORD')"
                            v-model="confirmPassword"
                            :error="errors.length > 0"
                            :error-messages="errors[0]"
                            autocomplete="off"
                          />
                        </ValidationProvider>
                      </v-form>
                    </v-card-text>
                    <div style="color: #1976d2;">
                      <!-- Disable signup button if not checked. -->
                      <div class="checkbox">
                        <input type="checkbox" />
                        <router-link
                          :to="{ name: 'toc' }"
                          tag="span"
                          style="cursor: pointer;"
                        >
                          I accept the Terms of Service
                        </router-link>
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        class="btn btn-primary btn-lg btn-block strong cta_2"
                        type="submit"
                        value="Sign me up!"
                      />
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <v-flex xs12 text-xs-center mt-5 mb-5>
      <br />
      <br />
    </v-flex>

    <v-flex xs12 text-xs-center mb-5>
      <br />
      <br />
    </v-flex>
    <v-flex xs12>
      <br />
      <br />
    </v-flex> -->
  </v-container>
</template>

<script>
export default {
  name: 'ProjectDescription'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Cookie');

.bmc-button img {
  width: 27px !important;
  margin-bottom: 1px !important;
  box-shadow: none !important;
  border: none !important;
  vertical-align: middle !important;
}
.bmc-button {
  line-height: 36px !important;
  height: 37px !important;
  text-decoration: none !important;
  display: inline-flex !important;
  color: #ffffff !important;
  background-color: #ff813f !important;
  border-radius: 3px !important;
  border: 1px solid transparent !important;
  padding: 1px 9px !important;
  font-size: 22px !important;
  letter-spacing: 0.6px !important;
  margin: 0 auto !important;
  font-family: 'Cookie', cursive !important;
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  -o-transition: 0.3s all linear !important;
  -webkit-transition: 0.3s all linear !important;
  -moz-transition: 0.3s all linear !important;
  -ms-transition: 0.3s all linear !important;
  transition: 0.3s all linear !important;
}
</style>

<template>
  <div class="home_banner container-fluid no-padding">
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
                <form
                  class="homeSignup formA"
                  id="signupForm1"
                  method="POST"
                  action="/auth/signup"
                >
                  <div class="form-group">
                    <label for="fullName" placeholder="Full Name"
                      >Full Name</label
                    >
                    <input
                      class="form-control"
                      type="text"
                      id="signupName"
                      placeholder
                      required="required"
                      autofocus="autofocus"
                    />
                  </div>
                  <div class="form-group">
                    <label for="emailAddress" placeholder="Email Address"
                      >Email Address</label
                    >
                    <input
                      class="form-control"
                      type="email"
                      id="signupEmail"
                      placeholder
                      required="required"
                    />
                  </div>
                  <div class="form-group">
                    <label for="phoneNumber" placeholder="Phone Number"
                      >Phone Number</label
                    >
                    <input
                      class="form-control"
                      type="number"
                      id="signupPhone"
                      placeholder
                      required="required"
                    />
                  </div>
                  <div class="form-group">
                    <label for="Password" placeholder="Password"
                      >Password</label
                    >
                    <input
                      class="form-control"
                      type="password"
                      id="signupPass1"
                      placeholder
                      required="required"
                    />
                  </div>
                  <div class="form-group">
                    <label for="Password" placeholder="Confirm Password"
                      >Confirm Password</label
                    >
                    <input
                      class="form-control"
                      type="password"
                      id="signupPass2"
                      placeholder
                      required="required"
                    />
                  </div>
                  <div class="form-group">
                    <div class="checkbox">
                      <label>
                        <input type="checkbox" checked="checked" /> I accept the
                        Terms of Service
                      </label>
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
  </div>
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

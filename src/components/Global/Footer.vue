<template>
  <!-- Site footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h6>About</h6>
          <p class="text-justify">Be Paid Limited is a professional Dunedin company with a big reputation for getting late payers to cough up. We have been operating since 2001 so you benefit from loads of our experience. Whether an invoice is a week overdue or has been sitting in your debtors' file for a year, we'll do our best to get it paid for you.</p>
        </div>

        <div class="col-xs-6 col-md-3">
          <h6>Categories</h6>
          <ul class="footer-links">
            <li v-on:mousedown="ChangeService(1)"><router-link to="/Services/ServiceArea"><a>Debt Collection</a></router-link></li>
            <li v-on:mousedown="ChangeService(0)"><router-link to="/Services/ServiceArea"><a>Ledger Management</a></router-link></li>
            <li v-on:mousedown="ChangeService(2)"><router-link to="/Services/ServiceArea"><a>Credit Checking</a></router-link></li>
            <li v-on:mousedown="ChangeService(9)"><router-link to="/Services/ServiceArea"><a>Background Check</a></router-link></li>
            <li v-on:mousedown="ChangeService(11)"><router-link to="/Services/ServiceArea"><a>Document Serving</a></router-link></li>
            <li v-on:mousedown="ChangeService(10)"><router-link to="/Services/ServiceArea"><a>Investigations</a></router-link></li>
          </ul>
        </div>

        <div class="col-xs-6 col-md-3">
          <h6>Quick Links</h6>
          <ul class="footer-links">
            <li><router-link to="/Services"><a>Service Icons</a></router-link></li>
            <li><router-link to="/Services/ServiceArea"><a>Service Area</a></router-link></li>
            <li><router-link to="/DebtLodgement"><a>Debt Lodgement</a></router-link></li>
          </ul>
        </div>
      </div>
      <hr>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">Copyright &copy; 2020 All Rights Reserved by
            <a href="#">In House Web</a>.
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>

<script>

    import {EventBus} from "../../App";
    export default {
        name: "HomeFooter",
        methods: {
            async ChangeService(Int) {
                this.$cookie.set('Service', Int, {expires: '10m'});
                EventBus.$emit('Service', Int);
            }
        }
    }
</script>

<style scoped>
  .site-footer
  {

    background-image: url("../../assets/images/Patterns/dot-grid-DarkBlue.png");
    background-size: 15%;

    padding:45px 0 20px;
    font-size:18px;
    line-height:24px;
    color:#737373;
  }
  .site-footer hr
  {
    border-top-color:#bbb;
    opacity:0.5
  }
  .site-footer hr.small
  {
    margin:20px 0
  }
  .site-footer h6
  {
    color:#000;
    font-size:16px;
    text-transform:uppercase;
    margin-top:5px;
    letter-spacing:2px
  }
  .site-footer a
  {
    color:#737373;
  }
  .site-footer a:hover
  {
    color:#3366cc;
    text-decoration:none;
  }
  .footer-links
  {
    padding-left:0;
    list-style:none
  }
  .footer-links li
  {
    display:block
  }
  .footer-links a
  {
    color:#737373
  }
  .footer-links a:active,.footer-links a:focus,.footer-links a:hover
  {
    color:#3366cc;
    text-decoration:none;
  }
  .footer-links.inline li
  {
    display:inline-block
  }
  .site-footer .social-icons
  {
    text-align:right
  }
  .site-footer .social-icons a
  {
    width:40px;
    height:40px;
    line-height:40px;
    margin-left:6px;
    margin-right:0;
    border-radius:100%;
    background-color:#33353d
  }
  .copyright-text
  {
    margin:0
  }
  @media (max-width:991px)
  {
    .site-footer [class^=col-]
    {
      margin-bottom:30px
    }
  }
  @media (max-width:767px)
  {
    .site-footer
    {
      padding-bottom:0
    }
    .site-footer .copyright-text,.site-footer .social-icons
    {
      text-align:center
    }
  }

  @media (max-width:767px)
  {
    li {
      margin-top: 5px;
    }
  }
</style>

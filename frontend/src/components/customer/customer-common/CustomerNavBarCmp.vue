<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" to="/"></router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
           
        </div>
    </nav>
</div>
</template>

<script>
export default {};
</script>

<style scoped>
.dashboard-container {
    padding: 20px;
}

.bg-light {
    background: rgb(9, 31, 38);
    background: linear-gradient(90deg,
            rgba(9, 31, 38, 1) 0%,
            rgba(60, 130, 147, 1) 43%,
            rgba(76, 103, 159, 1) 67%,
            rgba(57, 96, 125, 1) 100%,
            rgba(43, 136, 136, 1) 100%,
            rgba(84, 64, 24, 1) 100%,
            rgba(0, 212, 255, 1) 100%,
            rgba(42, 49, 224, 1) 100%);
    color: white;
}

.nav-link {
    color: white !important;
    font-family: "Montserrat", sans-serif !important;
    font-size: 15px;
    transition: all 0.5s;
    text-transform: uppercase;
}

.nav-link:hover {
    color: rgb(243, 160, 34) !important;
}

.navbar-brand {
    color: #ff9f43 !important;
    font-size: 30px !important;
    background-position: center;
    background-size: cover;
    height: 6rem;
    width: 10rem;
    background-image: url("https://cdn3.iconfinder.com/data/icons/fintech-color-pop-vol-2/64/internet-banking-512.png") !important;
}
</style>

<style>
#eenwoud-logo {
	position: absolute;
	top: 50vh;
	left: 50vw;
	transform: translateX(-50%) translateY(-50%);
	width: 25rem;
}

#bladerdek {
  position: relative;
  min-width: 50rem;
	width: 100%;
	left: 0;
  top: 70vh;
  transform: translateZ(1.4);
}

.cloud {
	position: fixed;
	width: 30rem;
}

.cloud:nth-of-type(1) {
	top: 50%;
	animation: cloud1 200s infinite linear;
	animation-delay: -80s;
}
.cloud:nth-of-type(2) {
	top: 1%;
	animation: cloud1 250s infinite linear; 
	animation-delay: -40s
}
.cloud:nth-of-type(3) {
	top: 20%;
	animation: cloud1 300s infinite linear;
	animation-delay: -200s;
}

@keyframes cloud1{
	0%{
		left: -40%;
	}
	100%{
		left: 100%;  
	}
}
</style>

<header>
  <img id="eenwoud-logo" src="./resources/images/eenwoud-wit.png" alt="eenwoud logo wit">
	<div>
		<img class="cloud" src="./resources/images/cloud1.png" alt="eenwoud logo wit">
		<img class="cloud" src="./resources/images/cloud2.png" id="cloud2" alt="eenwoud logo wit">
		<img class="cloud" src="./resources/images/cloud3.png" alt="eenwoud logo wit">	
	</div>
	<img id="bladerdek" src="./resources/images/bladerdek.png" alt="eenwoud logo wit">
</header>	
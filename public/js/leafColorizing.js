const p = console.log;
const totalWidth = window.innerWidth;

var color1 ="hsl(180,83%,47%)";//"hsl(45,93%,47%)"
var color2 ="hsl(192, 83%, 47%)";//"hsl(0, 93%, 47%)"

const haiku = document.querySelectorAll("[id^='haiku-']");

function displayHaiku(){
  let haikuTimeline = gsap.timeline({paused:true});  

  haikuTimeline.to(haiku,{
    opactiy: 1,
    stagger:{
      from:"start",
      each: .25,
      ease: "power2.inOut"
    }
  })
}


window.addEventListener("mousemove", (event) => {
  let x = event.pageX;
  var trunkControl = 35;//plus
  var midControl = 15;//minus
  var darkControl = 30;//minus

  const bonsaiHighlights = document.querySelector("#tree-highlights");
  const bonsaiMid = document.querySelector("#tree-mids");
  const bonsaiDark = document.querySelector("#tree-darks");
  const trunkShape = document.querySelector("#trunk-shade-8");
  const bgHue = document.querySelector("#bonsai-background");
  const haikuFrame = document.querySelector("#haikuFrame");


  let colors = gsap.utils.mapRange(0, totalWidth, 0, 1,x);  
  let colorPick = gsap.utils.interpolate(color1,color2,colors);

  // p("%cCurrentColor: ","color:green;");
  // p( gsap.utils.interpolate(color1,color2,colors))
	
  bonsaiHighlights.style.fill = colorPick;
  
  let arr = colorPick.split(','); //splits currentColor into an array

  let numString = Array.from(arr[2].slice(0,-1))//removes the % from lightness
  let reconstitutedNum = Number(numString.join(""));// lightness integer without %

  let midBonsaiColor_Lightness = reconstitutedNum - midControl;
  let midArr = arr.splice(2,1,midBonsaiColor_Lightness+"%")
  // p("midColor: " + arr)
  bonsaiMid.style.fill = arr;
  var midColor = arr;

  let darkBonsaiColor_Lightness = reconstitutedNum - darkControl;
  let darkArr = arr.splice(2,1,darkBonsaiColor_Lightness+"%");
  //p("darkColor: " + arr);
  bonsaiDark.style.fill = arr;
  var darkColor = arr;

  let bonsaiTrunk_Lightness = reconstitutedNum + trunkControl;
  let trunkArr = arr.splice(2,1,bonsaiTrunk_Lightness+"%");
  // p("trunkColor: " + arr);
  trunkShape.style.fill = arr;
  var trunkColor = arr;
  trunkShape.style.mixBlendMode = "multiply";
  
  bgHue.style.background = `radial-gradient(circle, rgba(255,255,255,1) 0%, ${colorPick})`;
})



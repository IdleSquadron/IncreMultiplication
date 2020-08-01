<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!--CSS imports-->
    <link rel="stylesheet" href="css/style.css" />

    <!--JS imports-->
    <script src="js/Variables.js" defer="true"></script>
    <script src="js/Notations.js" defer="true"></script>
    <script src="js/SavingSystem.js" defer="true"></script>
    <script src="js/Shortcuts.js" defer="true"></script>
    <script src="js/prestige.js" defer="true"></script>
    <script src="js/formulas.js" defer="true"></script>
    <script src="js/GameLoop.js" defer="true"></script>
    <script src="js/script.js" defer="true"></script>
  </head>
  <body>
    <p><span id="number">0</span> (+<span id="number/s">1</span>/s)</p>
    <div id="options-row">
      <button class="tabButton" onclick="tab(1)">
        Multipliers
      </button>
      <button class="tabButton" onclick="tab(2)">
        Settings
      </button>
      <button class="tabButton" onclick="tab(3)">
        Statistics
      </button>
      <button class="tabButton invisible" onmousedown="tab(4);this.className='tabButton'">
        Sike
      </button>
    </div>
    <div id="tab1" style="display:none">
      <div id="multiplierListMain">
        <!--<div>
          <button onclick="buyMultiplier(1)" class="normalButton unbuyable">
            Buy 1 for<br /><span id="mult1Cost">10</span>
          </button>
          <p>
            Multiplier 1
          </p>
          <p>Amount: <span id="mult1Amount"></span></p>
          <p>x<span id="mult1Boost">1</span> (+BRUH/s)</p>
        </div>-->
        <div></div>
      </div>
      <div>
        <p>
          Multiplier Prestiges (<span id="multiplierPrestiges">0</span>):
          Requires
          <span id="multiplierPrestigeRequirement">250</span>
        </p>
        <button class="normalButton unbuyable" onclick="multiplierPrestige()">
          Do a Multiplier Prestige
        </button>
      </div>
    </div>
    <div id="tab2" style="display:none">
      <div>
        Coming soon...
      </div>
      <a href="/ChangeLog.html">Change Log</a>
    </div>
    <div id="tab3" style="display:none"></div>
    <div id="tab4" style="display:none">
      <p>
        <!--You have <span id="prestigePoints">0</span> Prestige Points, translating
        to a 1x multiplier to Mutliplier Boost Growth.-->Haha, not the easter
        egg anymore...
      </p>
      <div style="display:flex">
      <div id="shh" class="invisible" style="width:50px;height:50px" onclick="this.className=''">
        Clever...
      </div>
        <div class="invisible" style="margin-left:20px;font-size:250px" onclick="if(get('shh').className==='')this.className=''">
          You found the EASTER EGG!
      </div>
    </div>
    </div>
  </body>
</html>

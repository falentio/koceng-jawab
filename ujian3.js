<!DOCTYPE html>
{"functionNames":["doGet","checkLogin","ambilMapel","ambilJawab","entriJawab","FileInitiator","Rekap","GETURLI","KirimKeRapor"],"sandboxMode":"IFRAME_SANDBOX","callbackTimeout":390000,"deploymentId":"AKfycby1LQUD6BfG4lDkTgZgbnkCJXgyBHe8-h3JwCQvLoIb3YHeRv7MuIBmOpeIxi4z4muHNw","eei":"","sandboxHost":"https:\/\/n-jp3hktga4vauofzw7lsvwnj3i6md23logc4fy7i-0lu-script.googleusercontent.com","clientSideProperties":{"google.script.sandbox.mode":"IFRAME_SANDBOX","google.script.host.origin":"https:\/\/docs.google.com"},"actionPrefix":"\/macros\/s\/AKfycby1LQUD6BfG4lDkTgZgbnkCJXgyBHe8-h3JwCQvLoIb3YHeRv7MuIBmOpeIxi4z4muHNw","userHtml":
<html>
  <head>
    <base target="_top">
    <script>
     function LoginUser()
      {
        var username = document.getElementById("uid").value;
        var password = document.getElementById("pas").value;
        
       
        google.script.run.withSuccessHandler(function(output) 
        {
          var iH = '';
          const hasil = output.split("#");
          
          if (hasil[0] == "T")
          {
            iH = '<button id="home" onclick="LogoutUser()" class="button button6">LOGOUT</button>'+hasil[2] + ':' + hasil[3] + '<br>' ;
            document.getElementById("klsnama").innerHTML = '<button id="home" onclick="Pulang()" class="button button3"><-Home</button>'+hasil[2] + ':' + hasil[3];
            
            for (var j = 1; j <= 16; j++) 
            {  
              if (hasil[j+4] !== '')
              {
              const mpl = hasil[j+4].split("|");
              const now = hasil[4].split(' ');
              const jdw = mpl[1].split(' ');

              if ((now[0] == jdw[0]))
              
              {
               iH = iH + '<button id="soal'+ j + '" onclick="Mapel('+hasil[1]+','+mpl[0]+')" class="button button5">'+mpl[2]+'|'+jdw[0]+' '+jdw[1]+'</button><br>';
              }
              }
            }
            document.getElementById("page2").innerHTML = iH;
            document.getElementById("page1").className = "page1off";
            document.getElementById("page2").className = "page2on";  
          }else{
            document.getElementById("errorMessage").innerHTML = "User ID dan Password tidak ditemukan";
          }
        }).checkLogin(username, password);
      }

     function Pulang()
      {
        var username = document.getElementById("uid").value;
        var password = document.getElementById("pas").value;
        document.getElementById("nosoal").value = 1;
       
        google.script.run.withSuccessHandler(function(output) 
        {
          var iH = '';
          const hasil = output.split("#");
          
          if (hasil[0] == "T")
          {
            iH = '<button id="home" onclick="LogoutUser()" class="button button6">LOGOUT</button>'+hasil[2] + ':' + hasil[3] + '<br>' ;
            document.getElementById("klsnama").innerHTML = '<button id="home" onclick="Pulang()" class="button button3"><-Home</button>'+hasil[2] + ':' + hasil[3];
            
            for (var j = 1; j <= 16; j++) 
            {  
              const mpl = hasil[j+4].split("|");
              const now = hasil[4].split(' ');
              const jdw = mpl[1].split(' ');

              if ((now[0] == jdw[0]))
              
              {
               iH = iH + '<button id="soal'+ j + '" onclick="Mapel('+hasil[1]+','+mpl[0]+')" class="button button5">'+mpl[2]+'|'+jdw[0]+' '+jdw[1]+'</button><br>';
              }
            }
            document.getElementById("page2").innerHTML = iH;
            document.getElementById("page3").className = "page3off";
            document.getElementById("page2").className = "page2on";  
          }else{
            document.getElementById("errorMessage").innerHTML = "User ID dan Password tidak ditemukan";
          }
        }).checkLogin(username, password);
      }

     function Mapel(baris, kolom)
      {
        
        
        var warna;
        google.script.run.withSuccessHandler(function(output) 
        {
          
          
          const dt = output.split("#");
          const dtmapel = dt[0].split("|");
          const jwb = dt[1].split("|");
          var urljwb,shjwb,baris,mpll,jsoal,gsoal;
          urljwb = dtmapel[0];
          shjwb = dtmapel[1];
          baris = dtmapel[2];
          mpll = dtmapel[3];
          jsoal = Number(dtmapel[4]);
          gsoal = dtmapel[5];

          var tb = '';
            tb = '<table>';
            tb = tb + '<tr>';
            for (var i = 1; i <= jsoal; i++) 
            {  
              if (jwb[i-1] == "X"){
                warna = 2;
              }else
              {
                warna = 1;
              }
              tb = tb + '<td><button id="butjwb'+ i + '" onclick="Ubah(' + i +')" class="button button' + warna + '">' + i + '</button></td>';
            }
            tb = tb + '</tr><tr>';
            for (var i = 1; i <= jsoal; i++) 
            {  
              tb = tb + '<td id="j' + i + '">' + jwb[i-1] + '</td>';
            }
            tb = tb + '</tr></table>';
 
            document.getElementById("answ").innerHTML = tb;
            document.getElementById("urljwb").value = urljwb;
            document.getElementById("shjwb").value = shjwb;
            document.getElementById("mpll").innerHTML = mpll;
            document.getElementById("baris").value = baris;
            document.getElementById("nosoal").value = 1;
            document.getElementById("jsoal").value = jsoal;
            document.getElementById("nosoallabel").innerText = 1;
            if (jwb[0] == "A"){
              document.getElementById("RA").checked = true;
              document.getElementById("RB").checked = false;
              document.getElementById("RC").checked = false;
              document.getElementById("RD").checked = false;
              document.getElementById("RE").checked = false;
            }
            if (jwb[0] == "B"){     
              document.getElementById("RA").checked = false;
              document.getElementById("RB").checked = true;
              document.getElementById("RC").checked = false;
              document.getElementById("RD").checked = false;
              document.getElementById("RE").checked = false;
            }
            if (jwb[0] == "C"){     
              document.getElementById("RA").checked = false;
              document.getElementById("RB").checked = false;
              document.getElementById("RC").checked = true;
              document.getElementById("RD").checked = false;
              document.getElementById("RE").checked = false;
            }
            if (jwb[0] == "D"){     
              document.getElementById("RA").checked = false;
              document.getElementById("RB").checked = false;
              document.getElementById("RC").checked = false;
              document.getElementById("RD").checked = true;
              document.getElementById("RE").checked = false;
            }
            if (jwb[0] == "E"){     
              document.getElementById("RA").checked = false;
              document.getElementById("RB").checked = false;
              document.getElementById("RC").checked = false;
              document.getElementById("RD").checked = false;
              document.getElementById("RE").checked = true;
            }
            if (jwb[0] == "X"){     
              document.getElementById("RA").checked = false;
              document.getElementById("RB").checked = false;
              document.getElementById("RC").checked = false;
              document.getElementById("RD").checked = false;
              document.getElementById("RE").checked = false;
            }
            document.getElementById("soal").innerHTML = gsoal;
            var gbr1 = document.getElementById("gb1").innerHTML;
            document.getElementById("soal").innerHTML = document.getElementById("soal").innerHTML + '<div id="gbx">'+gbr1+'</div>';
                      
          document.getElementById("page2").className = "page2off";
          document.getElementById("page3").className = "page3on";  
          
        }).ambilMapel(baris, kolom);       
       
      }

     function LogoutUser()
      {
        document.getElementById("uid").value = "";
        document.getElementById("pas").value = "";
        document.getElementById("page2").className = "page2off";
        document.getElementById("page1").className = "page1on";  
      }

      function ClearMessage()
      {
        document.getElementById("errorMessage").innerHTML = ""; 
      }

     function Ubah(nosoal)
      {
        var baris = document.getElementById("baris").value;

        var prenosoal = document.getElementById("nosoal").value;
        var gbr1 = document.getElementById("gb" + nosoal).innerHTML;
        document.getElementById("gbx").innerHTML = gbr1;

        document.getElementById("nosoal").value = nosoal;
       

            document.getElementById("RA").disabled = true;
            document.getElementById("RB").disabled = true;
            document.getElementById("RC").disabled = true;
            document.getElementById("RD").disabled = true;
            document.getElementById("RE").disabled = true;
      
        var output = document.getElementById("j" + nosoal).innerHTML; 
        document.getElementById("nosoallabel").innerText = nosoal;
        if (output == "A"){
            document.getElementById("RA").checked = true;
            document.getElementById("RB").checked = false;
            document.getElementById("RC").checked = false;
            document.getElementById("RD").checked = false;
            document.getElementById("RE").checked = false;
          }
          if (output == "B"){     
            document.getElementById("RA").checked = false;
            document.getElementById("RB").checked = true;
            document.getElementById("RC").checked = false;
            document.getElementById("RD").checked = false;
            document.getElementById("RE").checked = false;
          }
          if (output == "C"){     
            document.getElementById("RA").checked = false;
            document.getElementById("RB").checked = false;
            document.getElementById("RC").checked = true;
            document.getElementById("RD").checked = false;
             document.getElementById("RE").checked = false;
          }
          if (output == "D"){     
            document.getElementById("RA").checked = false;
            document.getElementById("RB").checked = false;
            document.getElementById("RC").checked = false;
            document.getElementById("RD").checked = true;
            document.getElementById("RE").checked = false;
          }
          if (output == "E"){     
            document.getElementById("RA").checked = false;
            document.getElementById("RB").checked = false;
            document.getElementById("RC").checked = false;
            document.getElementById("RD").checked = false;
            document.getElementById("RE").checked = true;
          }
          if (output == "X"){     
            document.getElementById("RA").checked = false;
            document.getElementById("RB").checked = false;
            document.getElementById("RC").checked = false;
            document.getElementById("RD").checked = false;
            document.getElementById("RE").checked = false;
          }
            document.getElementById("RA").disabled = false;
            document.getElementById("RB").disabled = false;
            document.getElementById("RC").disabled = false;
            document.getElementById("RD").disabled = false;
            document.getElementById("RE").disabled = false;  
      }
    
     function Answer(jawab)
      {
        var urljwb = document.getElementById("urljwb").value;
        var shjwb = document.getElementById("shjwb").value;
        var baris = document.getElementById("baris").value;
        var nosoal = document.getElementById("nosoal").value;
        document.getElementById("butjwb"+nosoal).className = "button button4";
            document.getElementById("RA").disabled = true;
            document.getElementById("RB").disabled = true;
            document.getElementById("RC").disabled = true;
            document.getElementById("RD").disabled = true;
            document.getElementById("RE").disabled = true;
        google.script.run.withSuccessHandler(function(output) 
        {
          document.getElementById("j"+nosoal).innerHTML = output;
          document.getElementById("butjwb"+nosoal).className = "button button1";
            document.getElementById("RA").disabled = false;
            document.getElementById("RB").disabled = false;
            document.getElementById("RC").disabled = false;
            document.getElementById("RD").disabled = false;
            document.getElementById("RE").disabled = false;
          
        }).entriJawab(urljwb, shjwb, baris, parseInt(nosoal) + 4, jawab);
      }
    
    </script>
    
    <style>

      .page1off{
        display:none;
      }

      .page1on{
        display: block;
      }

      .page2off{
        display:none;
      }

      .page2on{
        display: block;
      }
      .page3off{
        display:none;
      }

      .page3on{
        display: block;
      }

      .pageoff{
        display:none;
      }

      .pageon{
        display: block;
      }

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
}

      input[type=number]:hover{
        border-bottom:2px solid black;
      }
      input[type=password]:hover{
        border-bottom:2px solid black;
      }


table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  
}

td, th {
  border: 1px solid #000000;
  text-align: center;
  padding: 0px;
}

t.button {
tt
ttborder: none;
ttcolor: white;
tt
tttext-align: center;
tttext-decoration: none;
ttdisplay: inline-block;
ttfont-size: 16px;
ttmargin: 4px 1px;
ttcursor: pointer;
ttwidth: 50px;
t}
t.button1 {background-color: #4CAF50; width: 50px; }
t.button2 {background-color: #f44336; width: 50px; }
t.button3 {background-color: #0043f6; width: 85px; }
  .button4 {background-color: #fafa00; width: 50px; }
  .button5 {background-color: #4CAF50; width: 300px; }
  .button6 {background-color: #ff0000; width: 100px; }

t#answ{t
ttmin-height: 40px;t
ttoverflow: auto;t
ttbackground-colour: #666699;t
t}
t#menu{t
ttmin-height: 50px;t
ttbackground-colour: #999999;t
t}
t#body{t
ttmin-height: 200px;t
ttmargin-top: 3px;t
ttbackground-colour: #efefef;t
t}t
t#soal{t
ttwidth: 100%;t
ttheight: 60vh;t
ttoverflow: auto;t
t}t
t#footer{
ttmin-height: 100px;
ttmargin-top: 3%;
ttbackground-colour: #666699;
t}
t#time, #answ, #menu, #body, #footer{
ttmargin-left: 10px;
ttmargin-right: 10px;
ttbox-shadow: 3px 5px 7px #666699;
ttborder: 1px solid black;
  }

    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

 </head>

 <body>
 


<center>
  <div class="page1on" id="page1"> 
    
    <table >
    <form>
      <tr><td style="border: none;text-align:left;">User ID</td><td width="100%" style="border: none;"><input type="text" name="uid" id="uid" oninput="ClearMessage()"\/></td></tr>
      <tr><td style="border: none;text-align:left;">Password</td><td width="100%" style="border: none;"><input type="text" name="pas" id="pas" oninput="ClearMessage()"\/></td></tr>
    </table>
    </form>
    <button onclick="LoginUser()" style="background-color: #04AA6D;color: white;padding: 12px 20px;border: none;border-radius: 4px;cursor: pointer;float: center;"\/>LOGIN</button>
    
    <br><span id="errorMessage" style="color: red" ></span>


  </div>


  <div class="page2off" id="page2">
  </div>


  <div class="page3off" id="page3">
    <input type="text" id="nosoal" style="width: 100%;padding: 12px;border: 1px solid #ccc;border-radius: 4px;resize: vertical;" hidden\/>
    <input type="text" id="baris" style="width: 100%;padding: 12px;border: 1px solid #ccc;border-radius: 4px;resize: vertical;" hidden\/>
    <input type="text" id="jsoal" style="width: 100%;padding: 12px;border: 1px solid #ccc;border-radius: 4px;resize: vertical;" hidden\/>
    <input type="text" id="urljwb" style="width: 100%;padding: 12px;border: 1px solid #ccc;border-radius: 4px;resize: vertical;" hidden\/>
    <input type="text" id="shjwb" style="width: 100%;padding: 12px;border: 1px solid #ccc;border-radius: 4px;resize: vertical;" hidden\/>
    <span id="klsnama" style="color: black" ></span><br>
    <span id="mpll" style="color: blue" ></span><br>
    <div id="answ">
    </div>
    <div id="menu">
      <p style="text-align:center">
      <b id="nosoallabel" style="font-size:20px;color:Blue;" >N\/A</b>:
      <input type="radio" id="RA" name="R1" onclick="Answer(this.value)" value="A">A.
      <input type="radio" id="RB" name="R1" onclick="Answer(this.value)" value="B">B.
      <input type="radio" id="RC" name="R1" onclick="Answer(this.value)" value="C">C.
      <input type="radio" id="RD" name="R1" onclick="Answer(this.value)" value="D">D.
      <input type="radio" id="RE" name="R1" onclick="Answer(this.value)" value="E">E.
      </p>
    <div id="soal">
    </div>  
    </div>
    
  </div>

</center>
  </body>
</html>
","ncc":"{"awhs":true}"}
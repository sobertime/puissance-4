    $.fn.P4 = function(y_value, x_value, player_one, player_two, color_one, color_two) {
      var statusPlugin = true;
      var current = null;
      var status = true;
      var text = "Au tour de ";
      var countOne = 0;
      var countTwo = 0;
      var currentPlayer = player_one;
      var nbToken = y_value * x_value;


      function main() {
        $("body").append("<div class=\"container-fluid\">");
        $(".container-fluid").append("<div class=\"row\">\n" +
          "<label class=\"player\">Joueur 1 :</label><input class=\"nameP1\" name=\"nameP1\" type=\"text\" placeholder=\"Pseudo\">" +
          "<label class=\"player2\">Joueur 2 :</label><input class=\"nameP2\" name=\"nameP2\" type=\"text\" placeholder=\"Pseudo\">" +
          "</div>" +
          "<div class=\"row\">" +
          "<select class=\"custom-select custom-select-lg col-md-2 offset-2 colorP1\">" +
          "<option value=\"blue\">Blue</option>" +
          "<option value=\"red\" selected>Rouge</option>" +
          "<option value=\"green\">Vert</option>" +
          "<option value=\"yellow\">Jaune</option>" +
          "<option value=\"purple\">Violet</option>" +
          "<option value=\"black\">Noir</option>" +
          "</select>" +
          "<label class=\"xy\">Taille de map:</label>" +
          "<select class=\"custom-select custom-select-lg col-md-1 offset-1 gridSize\">" +
          "<option value=\"7\" selected>7</option>" +
          "<option value=\"8\">8</option>" +
          "<option value=\"9\">9</option>" +
          "<option value=\"10\">10</option>" +
          "<option value=\"14\">14</option>" +
          "</select><p class=\"cross\">x</p>" +
          "<select class=\"custom-select custom-select-lg col-md-1  gridSize2\"" +
          "<option value=\"6\" selected>6</option>" +
          "<option value=\"7\">7</option>" +
          "<option value=\"8\">8</option>" +
          "<option value=\"9\">9</option>" +
          "<option value=\"10\">10</option>" +
          "<option value=\"14\">14</option>" +
          "</select>" +
          "<select class=\"custom-select custom-select-lg col-md-2 offset-1 colorP2\">" +
          "<option value=\"blue\"selected>Blue</option>" +
          "<option value=\"red\">Rouge</option>" +
          "<option value=\"green\">Vert</option>" +
          "<option value=\"yellow\">Jaune</option>" +
          "<option value=\"purple\">Violet</option>" +
          "<option value=\"black\">Noir</option>" +
          "</select>" +
          "<button type=\"button\" class=\"btn_play btnsbm\">Play</button>" +
          "</div>" +
          "</div>"
        );
        var replay = $("<button>Rejouer</button>").addClass("replay");
        $("header").prepend(replay);
        var back = $("<button>Play Online</button>").addClass("back");
        $("header").append(back);
        $(".btnsbm").click(function() {

          x_value = $(".gridSize").val();
          y_value = $(".gridSize2").val();
          color_one = $(".colorP1").val();
          color_two = $(".colorP2").val();
          player_one = $(".nameP1").val();
          player_two = $(".nameP2").val();
          currentPlayer = player_one;
          nbToken = y_value * x_value;

          if (color_one == color_two) {

            $("body").prepend("<section class='alert'><p>L'un des joueurs doit changer de couleur</p></section>");
            function remove() {
              $(".alert").remove();
            }
            setTimeout(remove, 3000);
            return;
          }

          if (player_one == player_two) {

            $("body").prepend("<section class='alert'><p>L'un des joueurs doit changer de pseudo</p></section>");

            function remove() {
              $(".alert").remove();
            }
            setTimeout(remove, 3000);
            return;
          } else {
            $("body").append("<p class='jname content'>" + text + currentPlayer + "</p>");
            //======================================GENERER LA MAP========================================================
            $("body").append("<table></table>");
            for (var i = 0; i < y_value; i++) {

              $("table").append("<tr id='" + i + "tr'></tr>");
              for (var j = 0; j < x_value; j++) {
                var td = $("<td></td>").attr("data-position", i + "-" + j);
                $("#" + i + "tr").append(td);
              }
            }
            //=============================================================================================================
            $("body").append("<section class='score'><p class='" + player_one + "'>" +
              player_one + "-" + color_one + "</p><p class='" + player_two + "'>" + player_two +"-" + color_two + "</p></section>");
            $(".btnsbm").hide();
            $(".colorP1").hide();
            $(".colorP2").hide();
            $(".gridSize").hide();
            $(".gridSize2").hide();
            $(".player").hide();
            $(".player2").hide();
            $(".nameP1").hide();
            $(".nameP2").hide();
            $(".xy").hide();
            $(".cross").hide();
            $("td").on("click", function() {
              if (statusPlugin) {
                position($(this), y_value, x_value);
              }
            });
          }
        })
      }
      main();


      $(".replay").on("click", function(e) {
        statusPlugin = false;
        $("span").fadeOut(400, function() {
          $(".btnsbm").show();
          $(".colorP1").show();
          $(".colorP2").show();
          $(".gridSize").show();
          $(".gridSize2").show();
          $(".player").show();
          $(".player2").show();
          $(".nameP1").show();
          $(".nameP2").show();
          $(".xy").show();
          $(".cross").show();
        });
        $("td").removeClass("active");
        $("table").remove();
        $(".score").remove();
        $(".btnsbm").show();
        $(".jname").remove();

        setTimeout(function() {
          statusPlugin = true;
        }, 1000);
      });

      function position(that, y_value, x_value) {
        var index = that.data("position").split("-");
        var y_position = index[0];
        var x_position = index[1];
        for (var countY = y_value; countY >= 0; countY--) {
          current = $("[data-position='" + (countY - 1) + "-" + x_position + "']");
          var currentclass = current.attr("class");
          if (currentclass != "active") {
            var color = (status) ? color_one : color_two;
            var tokensize = $(".token").length;
            if (countY === 0) {
              return;
            }
            current.addClass("active").append("<span class='token'></span>");
            current.find("span").animate({
              marginTop: 0
            }, "slow").css("background-color", color);
            status = !status;
            currentPlayer = (status) ? player_one : player_two;
            $(".jname").text(text + currentPlayer);
            status = !status;
            map(y_value, x_value, countY, x_position, y_position);
            status = !status;
            if (nbToken === (tokensize + 1)) {
              alert("C'est plein !Faut rejouer !");
              statusPlugin = !statusPlugin;
              return;
            }
            return;
          }
        }
      }

      function map(y_value, x_value, countY, x_position, y_position) {
        vertical(y_value, countY, x_position);
        horizontal(y_value, x_value, countY, x_position, y_position);
        diagoleft(y_value, countY, x_position);
        diagoright(y_value, countY, x_position);
      }

      function vertical(y_value, y, x_position) {
        var verti = 0;
        y--;
        var rgb = $("[data-position='" + y + "-" + x_position + "']").find("span").css("background-color");
        for (var countY = y; countY < y_value; countY++) {
          var morergb = $("[data-position='" + countY + "-" + x_position + "']").find("span").css("background-color");
          if (rgb === morergb) {
            verti++;
            if (verti === 4) {
              statusPlugin = !statusPlugin;
              win();
              return;
            }
          } else {
            return;
          }
        }
      }

      function horizontal(y_value, x_value, y, x_position, y_position) {
        var hori = 0;
        y--;
        x_value = (x_value - 1);
        var rgbh = $("[data-position='" + y + "-" + x_position + "']").find("span").css("background-color");
        for (var countX = x_position; countX <= x_value; countX++) {
          var morergbh = $("[data-position='" + y + "-" + countX + "']").find("span").css("background-color");
          if (rgbh === morergbh) {
            hori++;
            current = $("[data-position='" + y + "-" + countX + "']").find("span")[0];
            if (hori === 4) {
              statusPlugin = !statusPlugin;
              win();
              return;
            } else {
              horileft(countX, y);
            }
          } else {
            return;
          }
        }
      }

      function horileft(x, y) {
        var horileft = 0;
        var morergbh = $("[data-position='" + y + "-" + x + "']").find("span").css("background-color");
        for (var countX = x; countX >= 0; countX--) {
          var currentrgb = $("[data-position='" + y + "-" + countX + "']").find("span").css("background-color");
          if (currentrgb === morergbh) {
            horileft++;
            if (horileft === 4) {
              statusPlugin = !statusPlugin;
              win();
              return;
            }
          } else {
            horileft = 0;
            return;
          }
        }
      }

      function diagoleft(y_value, y, x_position) {
        y--;
        var diagoleft = 0;
        var morergbh = $("[data-position='" + y + "-" + x_position + "']").find("span").css("background-color");
        for (var countY = x_position; countY <= y_value; countY++) {
          var currentrgb = $("[data-position='" + y + "-" + countY + "']").find("span").css("background-color");
          if (currentrgb === morergbh) {
            diagoleft++;
            if (diagoleft >= 4) {
              statusPlugin = !statusPlugin;
              win();
              return;
            } else {
              leftBottom(y, countY);
            }
          } else {
            return;
          }
          y--;
        }
      }

      function leftBottom(x, y) {
        var morergb = $("[data-position='" + x + "-" + y + "']").find("span").css("background-color");
        var diagoBF = 0;
        for (var countY = y; countY >= 0; countY--) {
          var rgbpos = $("[data-position='" + x + "-" + countY + "']").find("span").css("background-color");
          if (rgbpos === morergb) {
            diagoBF++;
            if (diagoBF >= 4) {
              statusPlugin = !statusPlugin;
              win();
              return true;
            }
          } else {
            return;
          }
          x++;
        }
      }

      function diagoright(y_value, y, x_position) {
        y--;
        var countDR = 0;
        var morergbh = $("[data-position='" + y + "-" + x_position + "']").find("span").css("background-color");
        for (var k = x_position; k <= y_value; k++) {
          var currentrgb = $("[data-position='" + y + "-" + k + "']").find("span").css("background-color");
          if (currentrgb === morergbh) {
            countDR++;
            if (countDR >= 4) {
              statusPlugin = !statusPlugin;
              win();
              return;
            } else {
              rightBottom(y, k);
            }
          } else {
            return;
          }
          y++;
        }
      }

      function rightBottom(x, y) {
        var morergb = $("[data-position='" + x + "-" + y + "']").find("span").css("background-color");
        var diagoBF = 0;
        for (var countY = y; countY >= 0; countY--) {
          var rgbpos = $("[data-position='" + x + "-" + countY + "']").find("span").css("background-color");
          if (rgbpos === morergb) {
            diagoBF++;
            if (diagoBF >= 4) {
              statusPlugin = !statusPlugin;
              win();
              return true;
            }
          } else {
            return;
          }
          x--;
        }
      }

      function win() {
        currentPlayer = (status) ? player_one : player_two;
        $("body").prepend("<section class='alert'><p>" + currentPlayer + " gagne la partie !" + "</p></section>");
        if (currentPlayer === player_one) {
          countOne++;
          $("." + currentPlayer).text(currentPlayer + " /" + countOne);
          console.log("player1 win");
        }
        if (currentPlayer === player_two) {
          countTwo++;
          $("." + currentPlayer).text(currentPlayer + " /" + countTwo);
          console.log("player2 win");
        }

        function remove() {
          $(".alert").remove();
        }
        setTimeout(remove, 3000);
      }

      $(".back").on("click", function(e) {
        console.log("PTDR TU CROIS QUE J'AI LE TEMPS DE FAIRE CA ?")
        alert("try again! #console.log");
      });
    };

    $(function() {
      $("window").P4($(".gridSize").val(), $(".gridSize2").val(), $(".nameP1").val(), $(".nameP2").val(), $(".colorP1").val(), $(".colorP2").val());
    });

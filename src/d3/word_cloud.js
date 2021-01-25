var d3 = require("d3"),
  cloud = require("./word-cloud-lib");

const w_words = (words, width, height) => {
  const layout = cloud()
    .size([width, height])
    .padding(2)
    .rotate(function() {
      return ~~(Math.random() * 2) * 90;
    })
    .font("Impact")
    .fontSize(function(d) {
      return d.size;
    })
    .on("end", draw);

  function draw(words) {
    d3.select("#word_cloud")
      .attr("width", layout.size()[0])
      .attr("height", layout.size()[1])
      .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", function(d) {
        return d.size + "px";
      })
      .style("font-family", "Impact")
      .style("fill", "#0071ae")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) {
        return d.text;
      });
  }

  return layout.words(
    words.map(function(d) {
      return {
        text: d,
        size: 10 + Math.random() * 90,
        test: "haha"
      };
    })
  );
};

export default w_words;

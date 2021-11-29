var global_var = {
	//513110937
	//1340290303
	url: "https://yanhip.github.io/THYP_21-22/omk/data/resource_templates.json",
};
main(global_var.url);

async function main(url) {
	let res = await d3.json(url);

	if (res != null) {
		await traitement_liste(res);
	} else {
		//todo
		console.log("error");
	}
}


async function traitement_liste(data) {
	var app = null,
		menu = null;
	data_length = data.length;

	if (document.getElementById("app") != null) {
		app = document.getElementById("app");
		app.innerHTML = "";
	}
	if (document.getElementById("menu") != null) {
		menu = document.getElementById("menu");
		menu.innerHTML = "";
	}
	if (app != null && menu != null) {
		if (data_length != null && data_length > 0) {
			app.innerHTML += "<h3> <u> Liste des ressources templates : </u></h3>";
			for (let i = 0; i < data_length; i++) {
				let r_template = data[i];
				let row;
				if (r_template["o:label"] != null) {
					row = document.createElement("div");
					row.classList.add("row");
					row.classList.add("my_row");
					row.id = "aforitem" + i;
					row.innerHTML = "<div class='aforitem' >" + r_template["o:label"] + "</div>";
					row.addEventListener("click", function (e) {
						main(r_template["@id"]);
					});
				}
				// console.log(table_keys);
				app.appendChild(row);
			}
		} else {
			let html = "";
			html += "<div style='display: flex;justify-content: space-between;'><h3> <u> Fiche du ressources templates </u>: " + data["o:label"] + "</h3> ";
			html += "<a class='btn btn-secondary backBtn pull-left' href=''> Retour </a></div>";
			app.innerHTML += html;
			if (data["o:resource_template_property"] != null) {
				app.innerHTML += "Nombre de propriété: " + data["o:resource_template_property"].length;
				for (let i = 0; i < data["o:resource_template_property"].length; i++) {
					let prop = data["o:resource_template_property"][i];
					let row;

					if (prop["o:property"] != null && prop["o:property"]["@id"] != null) {
						let prop_info = await d3.json("https://yanhip.github.io/THYP_21-22/omk/data/resource_templates_"+prop["o:property"]["o:id"]+".json");
						console.log();
						row = document.createElement("div");
						row.classList.add("row");
						row.classList.add("my_row");
						row.innerHTML = "Label: " + prop_info["o:label"] + " ; term: " + prop_info["o:term"];
						app.appendChild(row);
						// row = document.createElement("div");
						// row.classList.add("row");
						// row.classList.add("my_row");
						// row.id = "aforitem" + i;
						// row.innerHTML = "<div class='aforitem' >" + r_template["o:label"] + "</div>";
						// row.addEventListener("click", function (e) {
						// 	main(r_template["@id"]);
						// });
					}
					// console.log(table_keys);
				}
			}
		}
	} else {
		//todo
	}
}

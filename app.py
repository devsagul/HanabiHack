from flask import Flask

app = Flask(__name__)

@app.route("/", methods=["GET","POST"])
def forkwell():
    try:
        if request.method == "POST":
            github_username = request.form['github_username']
            code, lang. statistics = getcode(github_username)
            vector, vector_lang = code2vec(code, lang)
            graph = generate_skills_graph(vector)
            famous_familiar_coders = get_famous_familiar_coders(vector, lang)
            best_matching_companies = get_matching_companies(vector, lang)
            resume = generate_cv(vector)
        return render_template("app.html", error = error)

    except Exception as e:
        return render_template("app.html", error = error) 

if __name__ == "__main__":
app.run()

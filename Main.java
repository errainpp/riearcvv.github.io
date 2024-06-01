import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {
        // Serve static files from the "public" directory
        staticFiles.location("/public");

        // Route for root
        get("/", (req, res) -> {
            res.redirect("/html.html");
            return null;
        });
    }
}

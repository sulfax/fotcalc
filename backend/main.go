package main

import (
	"encoding/json"
	"net/http"
)

var db Database

func main() {
	db = NewInMemoryDB()

	http.HandleFunc("/clubs", func(w http.ResponseWriter, r *http.Request) {
		clubs := db.GetClubs()
		json.NewEncoder(w).Encode(clubs)
	})

	http.ListenAndServe(":8080", nil)
}

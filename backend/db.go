package main

type Database interface {
	GetClubs() []Club
}

type Club struct {
	Name   string
	Points int
}

type InMemoryDB struct {
	clubs []Club
}

func NewInMemoryDB() *InMemoryDB {
	return &InMemoryDB{
		clubs: []Club{
			{"Club A", 100},
			{"Club B", 150},
		},
	}
}

func (db *InMemoryDB) GetClubs() []Club {
	return db.clubs
}

#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, vec, Env, String, Symbol, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Note {
    pub id: u64,
    pub title: String,
    pub content: String,
}

const NOTE_IDS: Symbol = symbol_short!("NOTE_IDS");

#[contract]
pub struct NotesContract;


#[contractimpl]
impl NotesContract {
    // Create a new note
    pub fn create_note(env: Env, title: String, content: String) -> u64 {
    }

    // Get all notes
    pub fn get_notes(env: Env) -> Vec<Note> {
    }

    // Update a note
    pub fn update_note(env: Env, id: u64, title: String, content: String) {
    }

    // Delete a note
    pub fn delete_note(env: Env, id: u64) {
        
    }
}

mod test;


// SCRIPT
// #[contractimpl]
// impl NotesContract {
//     // Create a new note
//     pub fn create_note(env: Env, title: String, content: String) -> u64 {
//         let id = env.prng().gen::<u64>();
        
//         let note = Note {
//             id,
//             title,
//             content,
//         };
        
//         let key = (symbol_short!("NOTE"), id);
//         env.storage().instance().set(&key, &note);
        
//         // Track ID
//         let mut ids: Vec<u64> = env.storage().instance().get(&NOTE_IDS).unwrap_or(vec![&env]);
//         ids.push_back(id);
//         env.storage().instance().set(&NOTE_IDS, &ids);
        
//         // Extend TTL to ensure instance storage survives
//         env.storage().instance().extend_ttl(50_000, 100_000);
        
//         id
//     }

//     // Get all notes
//     pub fn get_notes(env: Env) -> Vec<Note> {
//         let ids: Vec<u64> = env.storage().instance().get(&NOTE_IDS).unwrap_or(vec![&env]);
//         let mut notes: Vec<Note> = vec![&env];
        
//         for id in ids.into_iter() {
//             let key = (symbol_short!("NOTE"), id);
//             if let Some(note) = env.storage().instance().get::<_, Note>(&key) {
//                 notes.push_back(note);
//             }
//         }
        
//         // Extend TTL on read
//         env.storage().instance().extend_ttl(50_000, 100_000);
        
//         notes
//     }

//     // Update a note
//     pub fn update_note(env: Env, id: u64, title: String, content: String) {
//         let key = (symbol_short!("NOTE"), id);
//         let mut note: Note = env.storage().instance().get(&key).unwrap();
//         note.title = title;
//         note.content = content;
//         env.storage().instance().set(&key, &note);
        
//         // Extend TTL
//         env.storage().instance().extend_ttl(50_000, 100_000);
//     }

//     // Delete a note
//     pub fn delete_note(env: Env, id: u64) {
//         let key = (symbol_short!("NOTE"), id);
//         env.storage().instance().remove(&key);
        
//         // Remove ID from tracking
//         let mut ids: Vec<u64> = env.storage().instance().get(&NOTE_IDS).unwrap_or(vec![&env]);
//         if let Some(index) = ids.first_index_of(id) {
//             ids.remove(index);
//             env.storage().instance().set(&NOTE_IDS, &ids);
//         }
        
//         // Extend TTL
//         env.storage().instance().extend_ttl(50_000, 100_000);
//     }
// }

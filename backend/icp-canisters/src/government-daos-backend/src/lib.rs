use ic_cdk::update;
use std::cell::RefCell;
use std::vec::Vec;
use std::ops::Deref;

mod utils {
    use crate::Dao;

    pub fn push_only_if_unique(daos: Vec<String>, new_dao_name: String) -> bool {
        return daos.contains(&new_dao_name)
    }
}

thread_local! {
    static CREATED_DAOS: RefCell<Vec<Dao>> = RefCell::new(Vec::<Dao>::new());
}

#[derive(Clone)]
struct DaoProposal {
    proposal_type: String,
    proposal_text: String,
    proposal_slug: String,
    proposal_count_vote_up: u64,
    proposal_count_vote_down: u64
}

#[derive(Clone)]
struct Dao {
    dao_canister_id: String, // todo: update to `CanisterId` type
    dao_name: String,
    dao_description: String,
    full_dao_token_name: String,
    short_dao_token_name: String,
    dao_initial_pool_amount: u64,
    dao_avatar_url: String,
    dao_end_time: u64,
    proposals: Vec<DaoProposal>
}

// todo: end dao on time with scheduler
fn end_dao(dao_name: String) {

}

#[update]
fn create_new_dao(
    dao_name: String,
    dao_description: String,
    full_dao_token_name: String,
    short_dao_token_name: String,
    dao_initial_pool_amount: u64,
    dao_avatar_url: String
) {
    // todo: deploy DAO canister and collect it's address
    CREATED_DAOS.with_borrow_mut(|daos| {
        if utils::push_only_if_unique(
            daos.iter().map(|dao| { dao.dao_name.clone() }).collect::<Vec<String>>(),
            dao_name.clone()
        ) {
            let dao = Dao {
                dao_canister_id: "new_dao_id_mock".to_string(),
                dao_name: dao_name,
                dao_description: dao_description,
                full_dao_token_name: full_dao_token_name,
                short_dao_token_name: short_dao_token_name,
                dao_initial_pool_amount: dao_initial_pool_amount,
                dao_avatar_url: dao_avatar_url,
                proposals: vec![],
                dao_end_time: 100000000
            };
            let mut cloned = daos.clone();
            cloned.push(dao);

            *daos = cloned;
        }
    });
}

#[update]
fn update_dao(dao_name: String, dao_description: String) {
    CREATED_DAOS.with_borrow_mut(|daos| {
        *daos = daos.clone()
            .into_iter().map(|mut dao| {
                if dao.dao_name == dao_name {
                    dao.dao_description = dao_description.to_string()
                }

                dao
            }).collect();
    });
}

#[update]
fn vote_dao_proposal_up(dao_name: String, proposal_slug: String) {
    CREATED_DAOS.with_borrow_mut(|daos| {
        *daos = daos.clone()
            .into_iter().map(|mut dao| {
                if dao.dao_name == dao_name {
                    dao.proposals = dao.proposals.into_iter().map(|mut proposal| {
                        if proposal.proposal_slug == proposal_slug {
                            proposal.proposal_count_vote_up = proposal.proposal_count_vote_up + 1
                        }

                        proposal
                    }).collect::<Vec<DaoProposal>>();
                }

                dao
            }).collect();
    });
}

#[update]
fn vote_dao_proposal_down(dao_name: String, proposal_slug: String) {
    CREATED_DAOS.with_borrow_mut(|daos| {
        *daos = daos.clone()
            .into_iter().map(|mut dao| {
                if dao.dao_name == dao_name {
                    dao.proposals = dao.proposals.into_iter().map(|mut proposal| {
                        if proposal.proposal_slug == proposal_slug {
                            proposal.proposal_count_vote_down = proposal.proposal_count_vote_down + 1
                        }

                        proposal
                    }).collect::<Vec<DaoProposal>>();
                }

                dao
            }).collect();
    });
}

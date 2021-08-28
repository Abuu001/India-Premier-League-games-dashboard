package io.lugonzo.ipldashboard.repository;

import io.lugonzo.ipldashboard.entity.Team;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository  extends CrudRepository<Team, Long> {

    Team findByTeamName(String teamName);

}
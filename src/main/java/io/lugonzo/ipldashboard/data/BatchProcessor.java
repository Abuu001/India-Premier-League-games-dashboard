package io.lugonzo.ipldashboard.data;

import io.lugonzo.ipldashboard.entity.Match;
import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDate;

public class BatchProcessor  implements ItemProcessor<MatchInput, Match> {

    @Override
    public Match process(final MatchInput matchInput) throws Exception {

        //set team 1 and team2 on the Innings order
        String firstInningsTeam,secondInningsTeam;

        if("bat".equals(matchInput.getToss_decision())){
            firstInningsTeam = matchInput.getToss_winner();
            secondInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1()) ? matchInput.getTeam2() : matchInput.getTeam1();
        }else{
            secondInningsTeam = matchInput.getToss_winner();
            firstInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1()) ? matchInput.getTeam2() : matchInput.getTeam1();
        }

        var match = Match.builder()
                .id(Long.parseLong(matchInput.getId()))
                .city(matchInput.getCity())
                .date(LocalDate.parse(matchInput.getDate()))
                .playerOfmatch(matchInput.getPlayer_of_match())
                .venue(matchInput.getVenue())
                .team1(firstInningsTeam)
                .team2(secondInningsTeam)
                .tossWinner(matchInput.getToss_winner())
                .tossDecision(matchInput.getToss_decision())
                .result(matchInput.getResult())
                .resultMargin(matchInput.getResult_margin())
                .umpire1(matchInput.getUmpire1())
                .umpire2(matchInput.getUmpire2())
                .build();


        return match;
    }
}
